/** @format */

const express = require("express");
const router = express.Router();
const {
  handleNewPost,
  textOnlyPost,
  getPost,
  countGetPost,
  getPersonalPost,
  editPost,
  countNotify,
  singlePost,
  getNotify,
  deletePost,
  deleteNotification,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router
  .post("/createpost", protect, handleNewPost)
  .post("/createtextpost", protect, textOnlyPost)
  .get("/getpost/:limit", protect, getPost)
  .get("/countPosts", protect, countGetPost)
  .post("/editpost", protect, editPost)
  .get("/singlePost/:pstId", protect, singlePost)
  .get("/countNotification", protect, countNotify)
  .get("/getNotify", protect, getNotify)
  .get("/getpersonalpost/:pid", protect, getPersonalPost)
  .delete("/deletepost/:pstID", protect, deletePost)
  .delete("/emptyNotification", protect, deleteNotification);

module.exports = router;
