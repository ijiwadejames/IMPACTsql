/** @format */

const express = require("express");
const router = express.Router();
const {
  handleNewComment,
  handleLikes,
  handleUnikes,
  deletePost,
  getReply,
} = require("../controllers/commentsAndLikesController");
const { protect } = require("../middleware/authMiddleware");

router
  .post("/handlecomment", protect, handleNewComment)
  .post("/deleteComment", protect, deletePost)
  .post("/likes", protect, handleLikes)
  .post("/unlike", protect, handleUnikes)
  .get("/getReply", protect, getReply);
module.exports = router;
