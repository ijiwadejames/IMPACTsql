const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("engage", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  postID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
