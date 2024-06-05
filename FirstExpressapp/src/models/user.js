var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB in User Model!");

//   var createUserTable = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL
//     )`;
//   con.query(createUserTable, function (err) {
//     if (err) throw err;
//     console.log("Table 'users' created or already exists");
//   });
});

var User = {
  addRegiData: function (email, password, callback) {
    var sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    con.query(sql, [email, password], function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getRegiDataLog: function (email, password, callback) {
    var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(sql, [email, password], function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = User;
