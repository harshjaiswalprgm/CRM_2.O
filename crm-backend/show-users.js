// show-users.js
const { db } = require('./db');

console.log("\n=== Admins ===");
console.log(db.prepare("SELECT id, name, email FROM admin").all());

console.log("\n=== Employees ===");
console.log(db.prepare("SELECT id, name, email FROM employees").all());

console.log("\n=== Interns ===");
console.log(db.prepare("SELECT id, name, email FROM interns").all());
