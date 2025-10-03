// routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { db } = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// protect all admin routes
router.use(authenticateToken, authorize('admin'));

/**
 * Employees CRUD
 */

// List employees
router.get('/employees', (req, res) => {
  const rows = db.prepare('SELECT id,name,email,position,salary,created_at FROM employees ORDER BY id DESC').all();
  res.json(rows);
});

// Create employee
router.post('/employees', (req, res) => {
  const { name, email, password, position, salary } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name,email,password required' });

  const existing = db.prepare('SELECT id FROM employees WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'Employee email already exists' });

  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO employees (name,email,password_hash,position,salary) VALUES (?,?,?,?,?)');
  const info = stmt.run(name, email, hash, position || null, salary || 0);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Get single employee
router.get('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT id,name,email,position,salary,profile,created_at FROM employees WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Update employee
router.put('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email, password, position, salary, profile } = req.body || {};
  const existing = db.prepare('SELECT id FROM employees WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  let hash = null;
  if (password) hash = bcrypt.hashSync(password, 10);

  const stmt = db.prepare(`UPDATE employees SET
    name = COALESCE(?, name),
    email = COALESCE(?, email),
    ${hash ? 'password_hash = ?,' : ''}
    position = COALESCE(?, position),
    salary = COALESCE(?, salary),
    profile = COALESCE(?, profile)
    WHERE id = ?`);

  // build params depending on whether hash exists
  if (hash) {
    stmt.run(name, email, hash, position, salary, profile, id);
  } else {
    stmt.run(name, email, position, salary, profile, id);
  }

  res.json({ ok: true });
});

// Delete employee
router.delete('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM employees WHERE id = ?').run(id);
  res.json({ ok: true });
});

/**
 * Interns CRUD (mirror employees)
 */

// List interns
router.get('/interns', (req, res) => {
  const rows = db.prepare('SELECT id,name,email,stipend,profile,created_at FROM interns ORDER BY id DESC').all();
  res.json(rows);
});

// Create intern
router.post('/interns', (req, res) => {
  const { name, email, password, stipend } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name,email,password required' });

  const existing = db.prepare('SELECT id FROM interns WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'Intern email already exists' });

  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO interns (name,email,password_hash,stipend) VALUES (?,?,?,?)');
  const info = stmt.run(name, email, hash, stipend || 0);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Get single intern
router.get('/interns/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT id,name,email,stipend,profile,created_at FROM interns WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Update intern
router.put('/interns/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email, password, stipend, profile } = req.body || {};
  const existing = db.prepare('SELECT id FROM interns WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  let hash = null;
  if (password) hash = bcrypt.hashSync(password, 10);

  const stmt = db.prepare(`UPDATE interns SET
    name = COALESCE(?, name),
    email = COALESCE(?, email),
    ${hash ? 'password_hash = ?,' : ''}
    stipend = COALESCE(?, stipend),
    profile = COALESCE(?, profile)
    WHERE id = ?`);

  if (hash) {
    stmt.run(name, email, hash, stipend, profile, id);
  } else {
    stmt.run(name, email, stipend, profile, id);
  }

  res.json({ ok: true });
});

// Delete intern
router.delete('/interns/:id', (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM interns WHERE id = ?').run(id);
  res.json({ ok: true });
});

module.exports = router;
