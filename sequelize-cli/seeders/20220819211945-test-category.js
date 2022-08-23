"use strict";
const { faker } = require('@faker-js/faker');

const generateData = (number) => {
  const data = [];

  for (let i = 0; i < number; i++) {
    data.push({
      name: faker.commerce.productName(),
      image: faker.image.imageUrl(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      generateData(100),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
