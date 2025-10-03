// routes/employees.js
const express = require('express');
const { db } = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// protected routes require authentication
router.use(authenticateToken);

// GET /employees
// - if admin: return all employees
// - if employee: return own summary
router.get('/', (req, res) => {
  if (req.user.role === 'admin') {
    const rows = db.prepare('SELECT id,name,email,position,salary,created_at FROM employees ORDER BY id DESC').all();
    return res.json(rows);
  }
  if (req.user.role === 'employee') {
    const row = db.prepare('SELECT id,name,email,position,salary,profile,created_at FROM employees WHERE id = ?').get(req.user.id);
    return res.json(row || {});
  }
  return res.status(403).json({ error: 'Forbidden' });
});

// GET /employees/:id/dashboard
router.get('/:id/dashboard', (req, res) => {
  const id = Number(req.params.id);
  // employees can only access their own dashboard unless admin
  if (req.user.role === 'employee' && req.user.id !== id) {
    return res.status(403).json({ error: 'Can only access your own dashboard' });
  }

  const profile = db.prepare('SELECT id,name,email,position,salary,profile,created_at FROM employees WHERE id = ?').get(id);
  if (!profile) return res.status(404).json({ error: 'Not found' });

  const attendance = db.prepare('SELECT id,date,status,check_in,check_out FROM attendance WHERE user_type = ? AND user_id = ? ORDER BY date DESC LIMIT 30')
    .all('employee', id);
  const performance = db.prepare('SELECT id,month,sales,targets,tasks_completed,notes FROM performance WHERE user_type = ? AND user_id = ? ORDER BY month DESC')
    .all('employee', id);

  res.json({ profile, attendance, performance });
});

module.exports = router;
