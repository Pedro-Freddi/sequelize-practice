"use strict";

module.exports = (sequelize, { Model, DataTypes }) => {
  /*
   *  Model class definition
   */

  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: "customerId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.ShippingAddress, {
        foreignKey: "shippingAddressId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsToMany(models.Product, {
        foreignKey: "productId",
        through: models.OrderItem,
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  /*
   *  Model initialization
   */

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
          // Can reference the model directly or the table name
          model: "customers",
          key: "id",
        },
      },
      shippingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // Can reference the model directly or the table name
          model: "shipping_addresses",
          key: "id",
        },
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
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      // Other model options are defined here
      // Pass the sequelize instance
      sequelize,
      modelName: "Order",
      // Table name can be specified through the tableName property
      tableName: "orders",
      // Map fields from camelCase to underscored syntax in database tables
      underscored: true,
    }
  );

  return Order;
};
