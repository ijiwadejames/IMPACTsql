/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueID: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "outbox",
  },
  isViewed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  messageBody: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  messageSenderID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  messageReceiverID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
