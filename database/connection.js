/** @format */

const Sequelize = require("sequelize");
require("dotenv").config();

const dbName = process.env.REACT_APP_DB_NAME;
const hostName = process.env.REACT_APP_DB_HOST;
const userName = process.env.REACT_APP_DB_USERNAME;
const password = process.env.REACT_APP_DB_PASSWORD;
const dialect = process.env.REACT_APP_DB_DIALECT;

const sequelize = new Sequelize(dbName, userName, password, {
  host: hostName,
  dialect: dialect,
});

module.exports = sequelize;
global.sequelize = sequelize;
