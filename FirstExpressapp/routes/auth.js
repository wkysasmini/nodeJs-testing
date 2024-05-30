var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB in Auth!");
});

router.use(function (req, res, next) {
  console.log("Middleware call");
  next();
});

router.post("/register", function (req, res) {
  let regidata = {
    email: req.body.email,
    password: req.body.password,
  };

  var sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  con.query(sql, [regidata.email, regidata.password], function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    console.log("User registered");
    res.status(201).json({ response: regidata });
  });
});

router.post("/log-in", function (req, res) {
  let logemail = req.body.email;
  let logpassword = req.body.password;

  // Check if email and password are provided
  if (logemail && logpassword) {
    con.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",[logemail, logpassword],function (results) {
        console.log(logemail);

        if (results.length >0) {
          // User is authenticated, create a token
          let payload = { email: logemail };
          let secret = "your-secret-key";

          let accessToken = jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "10y",
          });
          let response = {
            token: accessToken,
          };
          res.json(response);
        } else {
          res.send("Incorrect Username and/or Password!");
        }
      }
    );
  } else {
    res.send("Please enter Username and Password!");
  }
});


router.post("/validate-token", function (req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  let gettoken = authHeader.split(" ");
  const token = gettoken[1];

  let secret = "your-secret-key";

  jwt.verify(
    token,
    secret,
    { algorithm: "HS256", expiresIn: "10y" },
    function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token is not valid", error: err });
      }
      res.json({ response: decoded });
    }
  );
});

module.exports = router;
