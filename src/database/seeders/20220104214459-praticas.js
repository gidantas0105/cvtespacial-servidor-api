'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Praticas', [{
      titulo: "Estação Meteorológica",
      url: "http://cvt-e.local/estacao",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Praticas', null, {});
  }
};
