// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'replace_me';
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1h';

function makeToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Admin login
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const row = db.prepare('SELECT * FROM admin WHERE email = ?').get(email);
  if (!row) return res.status(400).json({ error: 'Invalid credentials' });

  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

  const token = makeToken({ id: row.id, role: 'admin', userType: 'admin' });
  const user = { id: row.id, name: row.name, email: row.email, role: 'admin' };
  res.json({ token, user });
});

// Employee login
router.post('/employee/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const row = db.prepare('SELECT * FROM employees WHERE email = ?').get(email);
  if (!row) return res.status(400).json({ error: 'Invalid credentials' });

  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

  const token = makeToken({ id: row.id, role: 'employee', userType: 'employees' });
  const user = { id: row.id, name: row.name, email: row.email, role: 'employee' };
  res.json({ token, user });
});

// Intern login
router.post('/intern/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const row = db.prepare('SELECT * FROM interns WHERE email = ?').get(email);
  if (!row) return res.status(400).json({ error: 'Invalid credentials' });

  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

  const token = makeToken({ id: row.id, role: 'intern', userType: 'interns' });
  const user = { id: row.id, name: row.name, email: row.email, role: 'intern' };
  res.json({ token, user });
});

module.exports = router;
