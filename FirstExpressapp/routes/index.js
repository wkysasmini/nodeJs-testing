var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 //res.render('index', { title: 'Express' });
 res.json({"response":"this is home page"});
});

/* GET home page. */
router.get('/s', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({"response":"this is home page s"});
 });

module.exports = router;
