"use strict";

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.createTable("orders", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      shipping_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shipping_addresses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "shipped", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
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
    await queryInterface.dropTable("orders");
  },
};
