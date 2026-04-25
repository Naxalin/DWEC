const db = require('../db');

const User = {
  create: (username, password, email, callback) => {
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, MD5(?), ?)';
    db.query(sql, [username, password, email], callback);
  },

  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  },

  update: (id, bio, email, callback) => {
    const sql = 'UPDATE users SET bio = ?, email = ? WHERE id = ?';
    db.query(sql, [bio, email, id], callback);
  }
};

module.exports = User;