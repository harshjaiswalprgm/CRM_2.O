// routes/interns.js
const express = require('express');
const { db } = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

// GET /interns
// admin: list all; intern: own summary
router.get('/', (req, res) => {
  if (req.user.role === 'admin') {
    const rows = db.prepare('SELECT id,name,email,stipend,profile,created_at FROM interns ORDER BY id DESC').all();
    return res.json(rows);
  }
  if (req.user.role === 'intern') {
    const row = db.prepare('SELECT id,name,email,stipend,profile,created_at FROM interns WHERE id = ?').get(req.user.id);
    return res.json(row || {});
  }
  return res.status(403).json({ error: 'Forbidden' });
});

// GET /interns/:id/dashboard
router.get('/:id/dashboard', (req, res) => {
  const id = Number(req.params.id);
  if (req.user.role === 'intern' && req.user.id !== id) {
    return res.status(403).json({ error: 'Can only access your own dashboard' });
  }

  const profile = db.prepare('SELECT id,name,email,stipend,profile,created_at FROM interns WHERE id = ?').get(id);
  if (!profile) return res.status(404).json({ error: 'Not found' });

  const attendance = db.prepare('SELECT id,date,status,check_in,check_out FROM attendance WHERE user_type = ? AND user_id = ? ORDER BY date DESC LIMIT 30')
    .all('intern', id);
  const performance = db.prepare('SELECT id,month,sales,targets,tasks_completed,notes FROM performance WHERE user_type = ? AND user_id = ? ORDER BY month DESC')
    .all('intern', id);

  res.json({ profile, attendance, performance });
});

module.exports = router;
