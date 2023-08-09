/** @format */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("users", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "isActive",
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropColumn("users", "status");
  },
};
