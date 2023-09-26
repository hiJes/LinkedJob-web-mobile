'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require ("../data/skills.json").map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el 
     })
     await queryInterface.bulkInsert('Skills', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Skills', null, {});
  }
};
