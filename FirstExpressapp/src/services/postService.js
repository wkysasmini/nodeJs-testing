const db = require('./db');

exports.createPost = (title, description, image, callback) => {
    const sql = "INSERT INTO posts (title, description, image) VALUES (?, ?, ?)";
    db.query(sql, [title, description, image], callback);
};

exports.readPost = (id, callback) => {
    const sql = "SELECT * FROM posts WHERE id = ?";
    db.query(sql, [id], callback);
};

exports.updatePost = (id, title, description, image, callback) => {
    const sql = "UPDATE posts SET title = ?, description = ?, image = ?, updated_date = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(sql, [title, description, image, id], callback);
};

exports.deletePost = (id, callback) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    db.query(sql, [id], callback);
};
