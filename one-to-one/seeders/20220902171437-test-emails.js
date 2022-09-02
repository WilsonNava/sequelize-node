"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const [users] = await queryInterface.sequelize.query(
      "SELECT id from Users"
    );

    await queryInterface.bulkInsert("Emails", [
      {
        email: "wilson@wilson.wilson",
        userId: users[0].id,
      },
      {
        email: "andrea@andrea.andrea",
        userId: users[1].id,
      },
      {
        email: "milu@milu.milu",
        userId: users[2].id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Emails", null, {});
  },
};
