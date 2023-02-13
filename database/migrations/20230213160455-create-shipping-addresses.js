"use strict";

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.createTable("shipping_addresses", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("shipping_addresses");
  },
};
