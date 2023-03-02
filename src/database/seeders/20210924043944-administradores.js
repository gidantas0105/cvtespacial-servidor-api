'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Administradores', [{
      name: "Gabriele Pereira Rodrigues",
      email: "gabriele@gmail.com",
      senha: "123",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Administradores', null, {});
  }
};
