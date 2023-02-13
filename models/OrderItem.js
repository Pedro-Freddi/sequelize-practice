"use strict";

module.exports = (sequelize, { Model, DataTypes }) => {
  /*
   *  Model class definition
   */

  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Product, {
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  /*
   *  Model initialization
   */

  OrderItem.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "compositeIndex",
        references: {
          model: "orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "compositeIndex",
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      modelName: "OrderItem",
      // Table name can be specified through the tableName property
      tableName: "orders_items",
      // Map fields from camelCase to underscored syntax in database tables
      underscored: true,
    }
  );

  return OrderItem;
};
