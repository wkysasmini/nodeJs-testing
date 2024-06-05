const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const secret = "your-secret-key";

exports.register = function (req, res) {
    let { name,email, password } = req.body;
    userService.registerUser(name, email, password, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        console.log("User registered");
        res.status(201).json({ response: "User registered" });
    });
};

exports.login = function (req, res) {
    let { email, password } = req.body;
    if (email && password) {
        userService.loginUser(email, password, function (err, results) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (results.length > 0) {
                let payload = { email: email };
                let accessToken = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "10y" });
                res.json({ token: accessToken });
            } else {
                res.status(401).send("Incorrect Username and/or Password!");
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
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, { algorithm: "HS256" }, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: "Token is not valid", error: err });
        }
        res.json({ response: decoded });
    });
};
