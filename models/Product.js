"use strict";

module.exports = (sequelize, { Model, DataTypes }) => {
  /*
   *  Model class definition
   */

  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        foreignKey: "orderId",
        through: models.OrderItem,
      });
      Product.hasMany(models.OrderItem, {
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    }
  }

  /*
   *  Model initialization
   */

  Product.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: DataTypes.TEXT,
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
      modelName: "Product",
      // Table name can be specified through the tableName property
      tableName: "products",
      // Map fields from camelCase to underscored syntax in database tables
      underscored: true,
    }
  );

  return Product;
};
