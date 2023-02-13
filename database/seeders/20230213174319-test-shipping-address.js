"use strict";

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.bulkInsert(
      "shipping_addresses",
      [
        {
          address: "123 Test St.",
          city: "Test Town",
          postal_code: "05815-090",
          country: "Test Land",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, { Op }) => {
    await queryInterface.bulkDelete("shipping_addresses", {
      where: {
        [Op.and]: {
          address: "123 Test St",
          postal_code: "05815-090"
        }
      },
    });
  },
};
