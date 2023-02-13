"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shipping_addresses", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
      },
      country: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("shipping_addresses");
  },
};
