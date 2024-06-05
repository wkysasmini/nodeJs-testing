var jwt = require("jsonwebtoken");
var User = require("../models/user");

var secret = "your-secret-key";

exports.register = function (req, res) {
  let regidata = {
    email: req.body.email,
    password: req.body.password,
  };

  User.addRegiData(regidata.email, regidata.password, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log("User registered");
      res.status(201).json({ response: "User registered" });
    }
  });
};

exports.login = function (req, res) {
  let logemail = req.body.email;
  let logpassword = req.body.password;

  if (logemail && logpassword) {
    User.getRegiDataLog(logemail, logpassword, function (err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (results.length > 0) {
          let payload = { email: logemail };
          let accessToken = jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "10y",
          });
          let response = { token: accessToken };
          res.json(response);
        } else {
          res.send("Incorrect Username and/or Password!");
        }
      }
    });
  } else {
    res.status(400).send("Please enter Username and Password!");
  }
};

exports.validateToken = function (req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  let gettoken = authHeader.split(" ");
  const token = gettoken[1];

  jwt.verify(token, secret, { algorithm: "HS256" }, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Token is not valid", error: err });
    }
    res.json({ response: decoded });
  });
};
