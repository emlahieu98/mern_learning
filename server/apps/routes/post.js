const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middlewares/auth");

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body
  const user = req.userId
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: (url.startsWith("http://")) ? url : `https://${url}`,
      status: status || 'TO LEARN',
      user
    })
    await newPost.save()
    return res
      .status(400)
      .json({ success: true, message: "Create new post successfully", post: newPost});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const user = req.userId;
  try {
    const post = await Post.find({ user }).populate('user')
    return res
      .status(200)
      .json({ success: true, message: "List post", posts: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  const user = req.userId;
  const { id } = req.params
  const post = await Post.findOne({_id: id})
  if (!post) {
    return res
      .status(400)
      .json({ success: false, message: "Post not found" });
  }
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    let updatePost = {
      title,
      description: description || '',
      url: url.startsWith("http://") ? url : `https://${url}`
    || '',
      status : status || 'TO LEARN'
    }
    await Post.updateOne({_id : id},updatePost);
    return res.status(400).json({
      success: true,
      message: "Update new post successfully",
      post: updatePost,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }
    await Post.deleteOne({ _id: id })
    return res.status(500).json({
      success: false,
      message: "Delete successfully",
    });  
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})
module.exports = router;
