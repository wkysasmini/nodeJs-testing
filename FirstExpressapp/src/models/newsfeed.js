var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB in Post Model!");

//   var createPostTable = `
//     CREATE TABLE IF NOT EXISTS posts (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       description LONGTEXT NOT NULL,
//       image TEXT,
//       created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )`;
//   con.query(createPostTable, function (err) {
//     if (err) throw err;
//     console.log("Table 'posts' created or already exists");
//   });
});

var Post = {
  create: function (title, description, image, callback) {
    var sql = "INSERT INTO posts (title, description, image) VALUES (?, ?, ?)";
    con.query(sql, [title, description, image], function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  read: function (id, callback) {
    var sql = "SELECT * FROM posts WHERE id = ?";
    con.query(sql, [id], function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  update: function (id, title, description, image, callback) {
    var sql = "UPDATE posts SET title = ?, description = ?, image = ?, updated_date = CURRENT_TIMESTAMP WHERE id = ?";
    con.query(sql, [title, description, image, id], function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  delete: function (id, callback) {
    var sql = "DELETE FROM posts WHERE id = ?";
    con.query(sql, [id], function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Post;
