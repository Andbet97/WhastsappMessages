const db = require('../config/db'); // Import db configuration

// Function to insert data
function insertMessage(sender, body, timestamp, sended = 0) {
  const stmt = db.prepare('INSERT INTO messages (sender, body, timestamp, sended) VALUES (?, ?, ?, ?)');
  stmt.run(sender, body, timestamp, sended);
  stmt.finalize();
}

// Function to get all messages
function getReceivedMessages(callback) {
  db.all('SELECT * FROM messages WHERE sended = 0', (err, rows) => {
    callback(err, rows);
  });
}

module.exports = { insertMessage, getReceivedMessages };
