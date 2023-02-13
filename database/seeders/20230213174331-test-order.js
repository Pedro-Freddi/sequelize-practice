"use strict";

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          customer_id: 1,
          shipping_address_id: 1,
          total: 35.99,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, { Op }) => {
    await queryInterface.bulkDelete("orders", {
      where: {
        [Op.and]: {
          customer_id: 1,
          shipping_address_id: 1,
        },
      },
    });
  },
};
