const db = require('../db');

const Project = {
  getAllByUser: (user_id, callback) => {
    const sql = 'SELECT * FROM projects WHERE user_id = ?';
    db.query(sql, [user_id], callback);
  },

  create: (title, description, repo_url, live_url, user_id, callback) => {
    const sql = 'INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, repo_url, live_url, user_id], callback);
  },

  update: (id, title, description, repo_url, live_url, user_id, callback) => {
    const sql = 'UPDATE projects SET title=?, description=?, repo_url=?, live_url=? WHERE id=? AND user_id=?';
    db.query(sql, [title, description, repo_url, live_url, id, user_id], callback);
  },

  delete: (id, user_id, callback) => {
    const sql = 'DELETE FROM projects WHERE id = ? AND user_id = ?';
    db.query(sql, [id, user_id], callback);
  }
};

module.exports = Project;