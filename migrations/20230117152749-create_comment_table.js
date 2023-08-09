"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("comments", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      reply: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postID: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      userID: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("comments");
  },
};
