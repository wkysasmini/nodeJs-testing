const db = require('./db');

exports.registerUser = (name, email, password, callback) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], callback);
};

exports.loginUser = (email, password, callback) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], callback);
};
