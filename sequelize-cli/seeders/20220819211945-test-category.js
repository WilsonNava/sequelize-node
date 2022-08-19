"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Category",
      [
        {
          name: "shoes",
          image: null,
        },
        {
          name: "home",
          image: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Category", null, {});
  },
};
