/** @format */

const express = require("express");
const router = express.Router();
const {
  registerUser,
  handleLogin,
  getMe,
  verifyUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router
  .post("/register", registerUser)
  .post("/auth", handleLogin)
  .get("/me", protect, getMe)
  .post("/verify-account/:key", verifyUser);

module.exports = router;
