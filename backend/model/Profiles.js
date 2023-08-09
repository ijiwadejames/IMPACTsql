/** @format */

const { Sequelize } = require("sequelize");
const sequelize = require("../../database/connection");

module.exports = sequelize.define("profile", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  userID: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  othernames: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "Mentee",
  },
  countries: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  phones: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  about: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  experience: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dd: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  yyyy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  iv: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  perdata: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
