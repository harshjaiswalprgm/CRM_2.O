// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.warn('Warning: JWT_SECRET is not set in .env');
}

function authenticateToken(req, res, next) {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header) return res.status(401).json({ error: 'Missing Authorization header' });

  const parts = header.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    // payload should include { id, role, userType } as created by auth endpoints
    req.user = payload;
    next();
  });
}

module.exports = { authenticateToken };
