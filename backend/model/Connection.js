/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("connection", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  senderID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  receiverID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requestStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isSent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAccepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
