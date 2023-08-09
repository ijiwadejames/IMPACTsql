/** @format */

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { email, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ijiwadejames@gmail.com",
      pass: "sofhwlspqkomchvj",
    },
  });

  const message = {
    from: "no-reply@impactacademy.com",
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.html,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      // res.status(500).send("Email could not be sent.");
    } else {
      console.log("Email sent: " + info.response);
      // res.send("Email sent successfully!");
    }
  });
};

module.exports = { sendMail };
