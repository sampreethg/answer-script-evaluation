const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'gradevision.db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// Initialize SQLite Relational Database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ SQLite Connection Error:', err.message);
  } else {
    console.log('✅ SQLite Database Connected Successfully: gradevision.db');
  }
});

// Create SQL Table for Users
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      dept TEXT NOT NULL,
      subject TEXT,
      reg_no TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// REGISTER USER ENDPOINT (INSERT INTO users)
app.post('/api/sqlite/register', (req, res) => {
  const { role, name, email, password, dept, subject, regNo } = req.body;
  const sql = `INSERT INTO users (role, name, email, password, dept, subject, reg_no) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [role, name, email, password, dept, subject || '', regNo || ''];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'This email is already registered in SQLite database.' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered in SQLite successfully', user: { id: this.lastID, role, name, email, dept, subject, regNo } });
  });
});

// SIGN IN ENDPOINT (SELECT FROM users)
app.post('/api/sqlite/login', (req, res) => {
  const { email, password, role } = req.body;
  const sql = `SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND role = ?`;
  db.get(sql, [email, role], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'SQLite Auth Verified', user });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 GradeVision SQLite Express Server running at http://localhost:${PORT}`);
});