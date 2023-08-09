'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.createTable("notifies", {
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
   })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable("notifies")
  }
};
