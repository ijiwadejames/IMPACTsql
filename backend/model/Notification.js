/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("notification", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  notifyRec: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  notifyGen: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  purpose: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pstId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  isViewed: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
