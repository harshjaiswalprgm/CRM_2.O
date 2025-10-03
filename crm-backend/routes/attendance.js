// routes/attendance.js
const express = require('express');
const { db } = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// All attendance endpoints require authentication
router.use(authenticateToken);

/**
 * POST /attendance/checkin
 * body: { user_type: 'employee' | 'intern' }
 * - marks today's check-in time for the authenticated user
 */
router.post('/checkin', (req, res) => {
  try {
    const user = req.user;
    const userType = req.body.user_type || (user.role === 'employee' ? 'employee' : user.role === 'intern' ? 'intern' : null);
    if (!userType || !['employee', 'intern'].includes(userType)) {
      return res.status(400).json({ error: 'user_type must be employee or intern' });
    }

    // enforce that user can only check in for themselves (admins can optionally check in on behalf)
    if (user.role !== 'admin' && userType !== user.role) {
      return res.status(403).json({ error: 'Cannot check in as other user type' });
    }

    const userId = user.id;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    // check if already a row for today
    const existing = db.prepare('SELECT * FROM attendance WHERE user_type = ? AND user_id = ? AND date = ?').get(userType, userId, today);
    if (existing) {
      // if already checked in, return that info
      return res.status(200).json({ message: 'Already checked in for today', attendance: existing });
    }

    const now = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO attendance (user_type,user_id,date,status,check_in) VALUES (?,?,?,?,?)');
    const info = stmt.run(userType, userId, today, 'present', now);

    const inserted = db.prepare('SELECT id,user_type,user_id,date,status,check_in,check_out FROM attendance WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ message: 'Checked in', attendance: inserted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /attendance/checkout
 * body: { user_type?: 'employee' | 'intern' }
 * - sets check_out for today's attendance row
 */
router.post('/checkout', (req, res) => {
  try {
    const user = req.user;
    const userType = req.body.user_type || (user.role === 'employee' ? 'employee' : user.role === 'intern' ? 'intern' : null);
    if (!userType || !['employee', 'intern'].includes(userType)) {
      return res.status(400).json({ error: 'user_type must be employee or intern' });
    }

    if (user.role !== 'admin' && userType !== user.role) {
      return res.status(403).json({ error: 'Cannot check out as other user type' });
    }

    const userId = user.id;
    const today = new Date().toISOString().slice(0, 10);
    const existing = db.prepare('SELECT * FROM attendance WHERE user_type = ? AND user_id = ? AND date = ?').get(userType, userId, today);
    if (!existing) {
      return res.status(400).json({ error: 'No check-in found for today' });
    }

    if (existing.check_out) {
      return res.status(200).json({ message: 'Already checked out', attendance: existing });
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE attendance SET check_out = ? WHERE id = ?').run(now, existing.id);

    const updated = db.prepare('SELECT id,user_type,user_id,date,status,check_in,check_out FROM attendance WHERE id = ?').get(existing.id);
    return res.json({ message: 'Checked out', attendance: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /attendance/me?days=30
 * - returns last `days` attendance records for authenticated user
 */
router.get('/me', (req, res) => {
  try {
    const user = req.user;
    const days = Number(req.query.days) || 30;
    const userType = user.role === 'employee' ? 'employee' : user.role === 'intern' ? 'intern' : null;
    if (!userType) return res.status(403).json({ error: 'Only employees/interns allowed' });

    const rows = db.prepare(`SELECT id,date,status,check_in,check_out FROM attendance
      WHERE user_type = ? AND user_id = ?
      ORDER BY date DESC
      LIMIT ?`).all(userType, user.id, days);

    return res.json({ attendance: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /attendance/:user_type/:user_id?days=30
 * - admin-only: view attendance for any user
 */
router.get('/:user_type/:user_id', (req, res) => {
  try {
    const requester = req.user;
    if (requester.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

    const userType = req.params.user_type;
    if (!['employee', 'intern'].includes(userType)) return res.status(400).json({ error: 'Invalid user_type' });

    const userId = Number(req.params.user_id);
    const days = Number(req.query.days) || 90;

    const rows = db.prepare(`SELECT id,date,status,check_in,check_out FROM attendance
      WHERE user_type = ? AND user_id = ?
      ORDER BY date DESC
      LIMIT ?`).all(userType, userId, days);

    return res.json({ attendance: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
