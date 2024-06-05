// 

var express = require("express");
var router = express.Router();
var newsfeedController = require("../controllers/newsfeedController");

router.post("/post-create", newsfeedController.createPost);
router.post("/post-read/:id", newsfeedController.readPost);
router.post("/post-update/:id", newsfeedController.updatePost);
router.post("/post-delete/:id", newsfeedController.deletePost);

module.exports = router;
