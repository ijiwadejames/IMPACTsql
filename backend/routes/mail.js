/** @format */

const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/mailController");
// const { protect } = require("../middleware/authMiddleware");

router.post("/confirm", sendMail);

module.exports = router;
