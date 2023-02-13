"use strict";

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.bulkInsert(
      "orders_items",
      [
        {
          order_id: 1,
          product_id: 1,
          quantity: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, { Op }) => {
    await queryInterface.bulkDelete("orders_items", {
      where: {
        [Op.and]: {
          order_id: 1,
          product_id: 1,
        },
      },
    });
  },
};
