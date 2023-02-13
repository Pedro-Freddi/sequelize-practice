"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          email: "testuser@example.com",
          password: "test123",
          first_name: "Test",
          last_name: "User",
          birth_date: "1999-01-01",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", { where: { email: "testuser@example.com" } });
  },
};
