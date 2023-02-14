"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.js")[env];
const db = {};

// Initialize sequelize instance (connection to database)
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Load all model files and store them in the "db" object
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

// Call association methods for the model if provided
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// (async () => {
//   try {
//     // await sequelize.authenticate();
//     // console.log("Connection has been established successfully.");

//     // // Synchronization should not be used in production apps - prefer to use migrations
//     // await sequelize.sync({ force: true });
//     // console.log("All models were synchronized successfully.");

//     console.log("\n*** SEQUELIZE MODELS ***\n");
//     console.log(sequelize.models);

//     // CUSTOMER MODEL
//     try {
//       // .create() is equivalent to calling .build() and then .save()
//       const customer = await db.Customer.create({
//         email: "test@example.com",
//         password: "test123",
//         firstName: "Test",
//         lastName: "User",
//         birthDate: "1995-05-09",
//         phone: "5511983387858",
//       });

//       console.log("\n*** CUSTOMER CREATED SUCCESSFULLY ***\n");
//       console.log(customer.toJSON());

//       // Testing class and instance methods
//       console.log("Customer's full name: " + customer.getFullName());
//       console.log("Customer table name: " + Customer.getCustomerTableName());
//       console.log(
//         "Number of customers: " + (await Customer.getNumOfCustomers())
//       );
//       console.log(
//         "Customer password matches: " + customer.comparePassword("test123")
//       );

//       // Updating specific fields with instance.update()
//       const updatedCustomer = await customer.update({
//         password: "new_password_123",
//       });
//       console.log("Password changed");
//       console.log(updatedCustomer.toJSON());

//       // Can also set properties directly on the model instance or call .set() and then call .save() to persist changes
//       updatedCustomer.set({ email: "test2@example.com", fistName: "New Name" });
//       await updatedCustomer.save();
//       console.log("Email and name updated");
//       console.log(updatedCustomer.toJSON());

//       // Other methods: .destroy() --> deletes instance from the database
//       //                .reload() --> reloads instance with up-to-date data from the database
//       //                .save() also accepts a { fields: [] } argument specifying which columns should be saved
//       //                .increment("column", { by: <INTEGER> }) --> increments an instance"s column value
//       //                .decrement("column", { by: <INTEGER> }) --> decrements an instance"s column value
//     } catch (error) {
//       console.log(`*** CUSTOMER CREATION ERROR ***: ${error.message}`);
//     }

//     // SHIPPING ADDRESS MODEL
//     try {
//       const shippingAddress = await db.ShippingAddress.create({
//         address: "123 Test Street",
//         city: "Test Town",
//         country: "Test Land",
//         postalCode: "05815-090",
//       });
//       console.log("\n*** SHIPPING ADDRESS CREATED SUCCESSFULLY ***\n");
//       console.log(shippingAddress.toJSON());
//     } catch (error) {
//       console.log(`*** SHIPPING ADDRESS CREATION ERROR ***: ${error.message}`);
//     }
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }

//   // ORDER MODEL
//   try {
//     const order = await db.Order.create({
//       customerId: 1,
//       shippingAddressId: 1,
//       total: 48.95,
//       status: "cancelled",
//     });
//     console.log("\n*** ORDER CREATED SUCCESSFULLY ***\n");
//     console.log(order.toJSON());
//   } catch (error) {
//     console.log(`*** ORDER CREATION ERROR ***: ${error.message}`);
//   }
// })();
