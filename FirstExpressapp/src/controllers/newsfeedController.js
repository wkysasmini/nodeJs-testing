var Post = require("../models/post");

exports.createPost = function (req, res) {
  let posttitle = req.body.title;
  let postdescription = req.body.description;
  let postimage = req.body.image;

  Post.create(posttitle, postdescription, postimage, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log("Post created successfully");
      res.status(201).json({ response: { title: posttitle, description: postdescription, image: postimage } });
    }
  });
};

exports.readPost = function (req, res) {
  let postreadid = req.params.id;

  Post.read(postreadid, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (result.length > 0) {
        let post = result[0];
        let response = {
          id: post.id,
          title: post.title,
          description: post.description,
          image: post.image,
          created_date: post.created_date,
          updated_date: post.updated_date
        };
        res.json(response);
        console.log("Post: " + postreadid);
      } else {
        res.send("Post not found");
      }
    }
  });
};

exports.updatePost = function (req, res) {
  let postupid = req.params.id;
  let posttitle = req.body.title;
  let postdescription = req.body.description;
  let postimage = req.body.image;

  Post.update(postupid, posttitle, postdescription, postimage, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (result.affectedRows > 0) {
        console.log("Post updated successfully");
        res.json({ response: "Post updated successfully" });
      } else {
        res.send("Post not found");
      }
    }
  });
};

exports.deletePost = function (req, res) {
  let postdelid = req.params.id;

  Post.delete(postdelid, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (result.affectedRows > 0) {
        console.log("Post deleted successfully");
        res.json({ response: "Post deleted successfully" });
      } else {
        res.send("Post not found");
      }
    }
  });
};
