// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { db } = require('./db');

const authRoutes = require('./routes/auth');      // you'll create this
const adminRoutes = require('./routes/admin');    // you'll create this
const empRoutes = require('./routes/employees');  // you'll create this
const internRoutes = require('./routes/interns'); // you'll create this
const attendanceRoutes = require('./routes/attendance'); // you'll create this

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }));

// mount (create the files next)
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/employees', empRoutes);
app.use('/interns', internRoutes);
app.use('/attendance', attendanceRoutes);

// start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
