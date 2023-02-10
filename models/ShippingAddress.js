const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database.js");

class ShippingAddress extends Model {}
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
      allowNull: false,
      field: "postal_code",
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    modelName: "ShippingAddress",
    // Table name can be specified through the tableName property
    tableName: "shipping_addresses",
  }
);

module.exports = ShippingAddress;
