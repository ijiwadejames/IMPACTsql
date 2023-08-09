/** @format */

const Engage = require("../model/Engage");
const { Op } = require("sequelize");

const addEngagement = async (req, res) => {
  const { pstID } = req.body;

  if (!pstID) {
    res.status(400).json({ message: "Invalid" });
    return;
  }

  // check for duplicate
  const duplicate = await Engage.findOne({
    where: {
      userID: req.user.id,
      postID: pstID,
    },
  });
  if (duplicate) {
    res.status(400).json({ message: "reengagement" });
    return;
  }

  const newEngage = {
    userID: req.user.id,
    postID: pstID,
  };

  const response = await Engage.create(newEngage);

  if (response) {
    console.log("Successful");
  } else {
    console.log("Unsuccessful");
  }
};

module.exports = {
  addEngagement,
};
