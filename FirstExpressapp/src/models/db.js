var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  //database: "testdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB!");

  con.query("CREATE DATABASE IF NOT EXISTS testdb", function (err, result) {
    if (err) throw err;
    console.log("Database created or already exists");

    con.query("USE testdb", function (err, result) {
      if (err) throw err;
      console.log("Using database 'testdb'");

      const createUsersTable = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL)`;
      con.query(createUsersTable, function (err) {
        if (err) throw err;
        console.log("Table 'users' created or already exists");
      });

      const createPostsTable = `CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,description LONGTEXT NOT NULL,image TEXT,created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;
      con.query(createPostsTable, function (err) {
        if (err) throw err;
        console.log("Table 'posts' created or already exists");
      });
    });
  });
});

module.exports = connection;
