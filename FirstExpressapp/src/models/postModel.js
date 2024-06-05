var db = require('../services/db');

var Post = {
  
  read: function (id, callback) {
    const sql = "SELECT * FROM posts WHERE id = ?";
    db.query(sql, [id], callback);
  },
  update: function (id, title, description, image, callback) {
    const sql = "UPDATE posts SET title = ?, description = ?, image = ?, updated_date = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(sql, [title, description, image, id], callback);
  },
  delete: function (id, callback) {
    const sql = "DELETE FROM posts WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Post;
