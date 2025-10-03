// seed/seed.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { db } = require('../db') || require('./db'); // allow running from project root

// create tables from migration SQL
const migrationSql = fs.readFileSync(path.join(__dirname, '../migrations/001_init.sql'), 'utf8');
db.exec(migrationSql);

// helper
const hash = (p) => bcrypt.hashSync(p, 10);

// create admin if not exists
const adminEmail = 'admin@example.com';
const admin = db.prepare('SELECT id FROM admin WHERE email = ?').get(adminEmail);
if (!admin) {
  db.prepare('INSERT INTO admin (name,email,password_hash) VALUES (?,?,?)')
    .run('Super Admin', adminEmail, hash('adminpass'));
  console.log('Admin user created: admin@example.com / adminpass');
} else {
  console.log('Admin already exists');
}

// create sample employee
const empEmail = 'alice@example.com';
const emp = db.prepare('SELECT id FROM employees WHERE email = ?').get(empEmail);
if (!emp) {
  db.prepare('INSERT INTO employees (name,email,password_hash,position,salary) VALUES (?,?,?,?,?)')
    .run('Alice', empEmail, hash('emppass'), 'Sales', 40000);
  console.log('Sample employee created: alice@example.com / emppass');
}

// create sample intern
const intEmail = 'bob.intern@example.com';
const intern = db.prepare('SELECT id FROM interns WHERE email = ?').get(intEmail);
if (!intern) {
  db.prepare('INSERT INTO interns (name,email,password_hash,stipend) VALUES (?,?,?,?)')
    .run('Bob', intEmail, hash('internpass'), 5000);
  console.log('Sample intern created: bob.intern@example.com / internpass');
}
