const db = require('../db');

const SocialLink = {
  getAllByUser: (user_id, callback) => {
    const sql = 'SELECT * FROM social_links WHERE user_id = ?';
    db.query(sql, [user_id], callback);
  },

  create: (platform, url, user_id, callback) => {
    const sql = 'INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)';
    db.query(sql, [platform, url, user_id], callback);
  },

  delete: (id, user_id, callback) => {
    const sql = 'DELETE FROM social_links WHERE id = ? AND user_id = ?';
    db.query(sql, [id, user_id], callback);
  }
};

module.exports = SocialLink;