require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const authRouter = require("./apps/routes/auth");
const postRouter = require("./apps/routes/post");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-learning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
