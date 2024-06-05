const postService = require("../services/postService");

exports.createPost = function (req, res) {
    let { title, description, image } = req.body;
    postService.createPost(title, description, image, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        console.log("Post created successfully");
        res.status(201).json({
            message: "Post created successfully",
            response: { title, description, image },
        });
    });
};

exports.readPost = function (req, res) {
    let postId = req.params.id;
    console.log(postId);
    postService.readPost(postId, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length > 0) {
            let post = result[0];
            let response = {
                id: post.id,
                title: post.title,
                description: post.description,
                image: post.image,
                created_date: post.created_date,
                updated_date: post.updated_date,
            };
            console.log("Post: " + postId);
            return res.json(response);
        } else {
            return res.status(404).send("Post not found");
        }
    });
};

exports.updatePost = function (req, res) {
    let postId = req.params.id;
    let { title, description, image } = req.body;
    postService.updatePost(postId, title, description, image, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows > 0) {
            console.log("Post updated successfully");
            res.json({ response: "Post updated successfully" });
        } else {
            res.status(404).send("Post not found");
        }
    });
};

exports.deletePost = function (req, res) {
    let postId = req.params.id;
    postService.deletePost(postId, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows > 0) {
            console.log("Post deleted successfully");
            res.json({ response: "Post deleted successfully" });
        } else {
            res.status(404).send("Post not found");
        }
    });
};
