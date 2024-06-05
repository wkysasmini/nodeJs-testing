var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var exampleRouter = require("./routes/example");
var authRouter = require("./routes/auth");
var newsfeedRouter = require("./routes/newsfeed");

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB in AppJs!");

  con.query("CREATE DATABASE IF NOT EXISTS testdb", function (err, result) {
    if (err) throw err;
    console.log("Database created or already exists");

    con.query("USE testdb", function (err, result) {
      if (err) throw err;
      console.log("Using database 'testdb'");

      var usersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT(11) AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255),
          password VARCHAR(255)
        )`;
      con.query(usersTable, function (err) {
        if (err) throw err;
        console.log("Table 'users' created or already exists");
      });

      var postsTable = `
        CREATE TABLE IF NOT EXISTS posts (
          id INT(11) AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255),
          created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          description LONGTEXT,
          image TEXT
        )`;
      con.query(postsTable, function (err) {
        if (err) throw err;
        console.log("Table 'posts' created or already exists");
      });
    });
  });
});

// Express server setup
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/example", exampleRouter);
app.use("/auth", authRouter);
app.use("/newsfeed", newsfeedRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
