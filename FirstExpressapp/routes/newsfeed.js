var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB in Newsfeed!");
});

router.post('/post-create', function(req, res) {
    let posttitle = req.body.title;
    let postdescription = req.body.description;
    let postimage = req.body.image;
  
    
    let sql = "INSERT INTO posts (title, description, image) VALUES (?, ?, ?)";
    con.query(sql, [posttitle, postdescription, postimage], function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      console.log("Post created successfully");
      res.status(201).json({ response: { title: posttitle, description: postdescription, image: postimage } });
    });
  });

router.post('/post-read', function(req, res) {
  let postreadid = req.body.id;


  let sql = "SELECT * FROM posts WHERE id = ?";
  con.query(sql, [postreadid], function(err, result) {
    if (err) {
        res.status(500).json({ error: err });
        return;
    }

    if (result.length > 0) {
      let post = result[0];
      let response = {
        title: post.title,
        description: post.description,
        image: post.image,
        created_date: post.created_date,
        updated_date: post.updated_date
      };

      if (post.created_date.getTime() === post.updated_date.getTime()) {
        delete response.updated_date;
      }

      res.json(response);
      console.log("Post: "+postreadid);
    } else {
      res.send("Post not found");
    }
  });
});

router.post('/post-update', function(req, res) {
  let postupid = req.body.id;
  let posttitle = req.body.title;
  let postdescription = req.body.description;
  let postimage = req.body.image;


  let sql = "UPDATE posts SET title = ?, description = ?, image = ?, updated_date = CURRENT_TIMESTAMP WHERE id = ?";
  con.query(sql, [posttitle, postdescription, postimage, postupid], function(err, result) {
    if (err) {
        res.status(500).json({ error: err });
        return;
    }

    if (result.affectedRows > 0) {
        console.log("Post updated successfully");
        res.json({response:"Post updated successfully"});
    } else {
      res.send("Post not found");
    }
  });
});

router.post('/post-delete', function(req, res) {
  let postdelid = req.body.id;

  
  let sql = "DELETE FROM posts WHERE id = ?";
  con.query(sql, [postdelid], function(err, result) {
    if (err) {
        res.status(500).json({ error: err });
        return;
    }

    if (result.affectedRows > 0) {
      console.log("Post deleted successfully");
      res.json({response:"Post deleted successfully"});
    } else {
      res.send("Post not found");
    }
  });
});

module.exports = router;
