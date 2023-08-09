/** @format */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("readersviews", {
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
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("readersviews");
  },
};
