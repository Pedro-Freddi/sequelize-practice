"use strict";

module.exports = (sequelize, { Model, DataTypes }) => {
  /*
   *  Model class definition
   */

  class ShippingAddress extends Model {
    static associate(models) {
      ShippingAddress.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      });
    }
  }

  /*
   *  Model initialization
   */

  ShippingAddress.init(
    {
      // Model attributes are defined here
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
      postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      // Other model options are defined here
      // Pass the sequelize instance
      sequelize,
      modelName: "ShippingAddress",
      // Table name can be specified through the tableName property
      tableName: "shipping_addresses",
      // Map fields from camelCase to underscored syntax in database tables
      underscored: true,
    }
  );

    return ShippingAddress;

};
