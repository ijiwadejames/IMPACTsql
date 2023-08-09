/** @format */

const express = require("express");
const router = express.Router();
const {
  handleConnection,
  getRequest,
  handleConnectionRequest,
  getFriends,
  getMyFriends,
  rejectRequest,
  removeFriend,
  cancelSentRequest,
  suspendFriend,
  reactivateFriend,
} = require("../controllers/friendsController");
const { protect } = require("../middleware/authMiddleware");

router
  .post("/handleConnection", protect, handleConnection)
  .delete("/cancelRequest/:cId", protect, cancelSentRequest)
  .post("/acceptRequest", protect, handleConnectionRequest)
  .delete("/removeRequest/:dId", protect, rejectRequest)
  .delete("/removeFrnd/:id", protect, removeFriend)
  .post("/suspendFrnd", protect, suspendFriend)
  .post("/reactivateFrnd", protect, reactivateFriend)

  .get("/getRequest", protect, getRequest)
  .get("/myFriends", protect, getFriends)
  .get("/getFriends/:pid", protect, getMyFriends); //For creating the connection button
module.exports = router;
