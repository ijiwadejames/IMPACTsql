/** @format */

const express = require("express");
const router = express.Router();
const { addEngagement } = require("../controllers/engageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addEngagement);

module.exports = router;
