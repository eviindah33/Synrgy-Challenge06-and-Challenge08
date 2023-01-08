"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      model: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      rent_price: {
        type: Sequelize.FLOAT,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      type: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
