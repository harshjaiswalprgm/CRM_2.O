CREATE TABLE IF NOT EXISTS admin (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  position TEXT,
  salary REAL DEFAULT 0,
  profile TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS interns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  stipend REAL DEFAULT 0,
  profile TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_type TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  check_in TEXT,
  check_out TEXT
);

CREATE TABLE IF NOT EXISTS performance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_type TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  month TEXT NOT NULL,
  sales INTEGER DEFAULT 0,
  targets INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  notes TEXT
);
