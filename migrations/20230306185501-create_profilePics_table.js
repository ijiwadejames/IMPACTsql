'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable("profilePics", {
      id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.dropTable("profilePics");
  }
};
