/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("notify", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
