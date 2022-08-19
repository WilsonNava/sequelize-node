"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          name: "tv",
          description: "super tv",
          amount: 1,
        },
        {
          name: "PS5",
          description: "Awesome games",
          amount: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
