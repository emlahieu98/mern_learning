const express = require('express')
const router = express.Router()
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")
const User = require('../models/User')
const verifyToken = require("../middlewares/auth");

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne(req.userId).select('-password')
    if (!user) return res.status(400).json({ success: false,message: 'User not found' })
    res.json({ success: true, user})
  } catch (error) {
    
  }
})

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({success: false, message:"Missing username and/or password"})
  }
  try {
    // Check exist username
    const user = await User.findOne({ username })
    if (user) {
    return res.status(400).json({success: false, message:"User is registered"})
    }
    const hashPassword = await argon2.hash(password)
    const newUser = new User({
      username,
      password: hashPassword
    })
    await newUser.save()
    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(400).json({
      success: true,
      message: "Register successful",
      accessToken: accessToken,
    }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    }); 
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  }
  try {
    // Check exist username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not found" });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!user || !passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorred username or password" });
    }
    // return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router
