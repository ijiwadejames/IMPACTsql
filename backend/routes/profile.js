/** @format */

const express = require("express");
const router = express.Router();
const {
  updateProfile,
  updateProfessionalProfile,
  getMe,
  connectionProfile,
  menteesProfile,
  lastseen,
  uploadProfilePicture,
  getProfilePicture,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

//DELCARE ROUTERS
router
  .post("/update", protect, updateProfile)
  .post("/updateProf", protect, updateProfessionalProfile)
  .post("/lastseen", protect, lastseen)
  .post("/uploadProfilePicture", protect, uploadProfilePicture)
  .get("/getMe", protect, getMe)
  .get("/getProfilePicture/:imageId", protect, getProfilePicture)
  .get("/connectionProfile/:pid", protect, connectionProfile)
  .get("/menteesProfile", protect, menteesProfile);

module.exports = router;
