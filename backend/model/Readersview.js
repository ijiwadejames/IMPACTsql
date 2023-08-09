/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("readersview", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  resUniqueID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  replyBody: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  messageID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  responderID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  responseReceiverID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isViewed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
