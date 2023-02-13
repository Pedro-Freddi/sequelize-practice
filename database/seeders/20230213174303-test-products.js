"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "test-product",
          display_name: "Test Product",
          sku: "3ESD228942",
          price: 15.99,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", {
      where: { name: "test-product" },
    });
  },
};
