"use strict";

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database.js");
const Customer = require("./Customer.js");
const ShippingAddress = require("./ShippingAddress.js");

class Order extends Model {}

Order.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
      field: "customer_id",
    },
    shippingAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShippingAddress,
        key: "id",
      },
      field: "shipping_address_id",
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    // Other model options are defined here
    // Pass the sequelize instance
    sequelize,
    modelName: "Order",
    // Table name can be specified through the tableName property
    tableName: "orders",
  }
);

module.exports = Order;
