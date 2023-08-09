'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable("collections", {
      id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  okys: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.drop("collections")
  }
};
