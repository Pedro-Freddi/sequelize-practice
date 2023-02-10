"use strict";

const sequelize = require("../config/database.js");
const Customer = require("./Customer.js");
const ShippingAddress = require("./ShippingAddress.js");
const Order = require("./Order.js");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Synchronization should not be used in production apps - prefer to use migrations
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");

    // CUSTOMER MODEL
    try {
      const customer = await Customer.create({
        email: "test@example.com",
        password: "test123",
        firstName: "Test",
        lastName: "User",
        birthDate: "1995-05-09",
        phone: "5511983387858",
      });
      console.log("\n*** CUSTOMER CREATED SUCCESSFULLY ***\n");
      console.log(customer.toJSON());
      console.log("Customer's full name: " + customer.getFullName());
      console.log("Customer table name: " + Customer.getCustomerTableName());
      console.log("Number of customers: " + await Customer.getNumOfCustomers());
      console.log("Customer password matches: " + customer.comparePassword("test123"));
    } catch (error) {
      console.log(`*** CUSTOMER CREATION ERROR ***: ${error.message}`);
    }

    // SHIPPING ADDRESS MODEL
    try {
      const shippingAddress = await ShippingAddress.create({
        address: "123 Test Street",
        city: "Test Town",
        country: "Test Land",
        postalCode: "05815-090",
      });
      console.log("\n*** SHIPPING ADDRESS CREATED SUCCESSFULLY ***\n");
      console.log(shippingAddress.toJSON());
    } catch (error) {
      console.log(`*** SHIPPING ADDRESS CREATION ERROR ***: ${error.message}`);
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // ORDER MODEL
  try {
    const order = await Order.create({
      customerId: 1,
      shippingAddressId: 1,
      total: 48.95,
      status: "cancelled"
    });
    console.log("\n*** ORDER CREATED SUCCESSFULLY ***\n");
    console.log(order.toJSON());
  } catch (error) {
    console.log(`*** ORDER CREATION ERROR ***: ${error.message}`);
  }
})();

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
