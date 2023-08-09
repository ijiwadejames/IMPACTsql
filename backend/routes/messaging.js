/** @format */

const express = require("express");
const router = express.Router();
const {
  handleMessaging,
  receiverMessages,
  sentMessages,
  deleteMessages,
  markAsRead,
  markUnread,
  replyMessage,
  readMessage,
  getChatMates,
  getLastMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

//DELCARE ROUTERS
router
  .post("/sendMessage", protect, handleMessaging)
  .delete("/deleteMsgs/:uId", protect, deleteMessages)
  .post("/isRead", protect, markAsRead)
  .post("/markUread", protect, markUnread)
  .post("/replyMsg", protect, replyMessage)
  .get("/getChats", protect, getChatMates)
  .get("/getMessage", protect, receiverMessages)
  .get("/lastMessage/:pid", protect, getLastMessage)
  .get("/getReadMessage/:pid", protect, readMessage)
  .get("/getOutBoxMessage", protect, sentMessages);

module.exports = router;
