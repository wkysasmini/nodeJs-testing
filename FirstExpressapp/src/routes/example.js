var express = require("express");
var router = express.Router();

// Router level Middleware
router.use(function (req, res, next) {
  console.log(req.params.data);
  console.log("Middleware call");
  next();
});

//HTTP Methods
/* Get */
router.post("/", function (req, res) {
  //  res.send('Test Response!!');
  res.json({ response: "this is example page" });
});

module.exports = router;
