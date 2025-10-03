// db/index.js
require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../crm.db');
const db = new Database(dbPath);

module.exports = {
  db,
  prepare: (sql) => db.prepare(sql),
  run: (sql, params = []) => db.prepare(sql).run(...params),
  get: (sql, params = []) => db.prepare(sql).get(...params),
  all: (sql, params = []) => db.prepare(sql).all(...params),
};
