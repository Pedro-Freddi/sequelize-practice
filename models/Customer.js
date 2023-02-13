"use strict";

// A model can be defined by creating a class that extends Sequelize.Model or by calling sequelize.define()
// The advantage of defining a class is that we can create static (class) and instance methods inside the class definition

// Table name is by default a pluralized version of the model name passed to sequelize.define() or modelName property
// id, created_at and updated_at are inserted by default in a model unless disabled through configuration

/*
 *  Model class definition
 */

module.exports = (sequelize, { Model, DataTypes }) => {
  
  class Customer extends Model {
    // We can create class methods
    static associate(models) {
      Customer.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      });
    }

    static getCustomerTableName() {
      return Customer.tableName;
    }

    static getNumOfCustomers() {
      return Customer.count();
    }

    // We can create instance methods
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    comparePassword(password) {
      return password === this.password;
    }
  }

  /*
   *  Model initialization
   */

  Customer.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // When only the type is being defined, we can use a shorthand to define the attribute
      lastName: DataTypes.STRING,
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      phone: DataTypes.STRING(13),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    {
      // Other model options are defined here
      // Pass the sequelize instance
      sequelize,
      modelName: "Customer",
      // Table name can be specified through the tableName property
      tableName: "customers",
      // Map fields from camelCase to underscored syntax in database tables
      underscored: true,
    }
  );

    return Customer;

};
