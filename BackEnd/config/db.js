const sqlite3 = require('sqlite3').verbose();

// Create a new database in memory or a file
const db = new sqlite3.Database('./messages.db');

// Create a sample table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT,
      body TEXT,
      timestamp INTEGER,
      sended INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
