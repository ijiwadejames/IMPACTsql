/** @format */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("connections", {
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
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("connections");
  },
};
