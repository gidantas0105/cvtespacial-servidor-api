'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Noticias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      urlTexto: {
        type: Sequelize.STRING
      },
      urlImagem: {
        type: Sequelize.STRING
      },
      dataPublicacao: {
        type: Sequelize.STRING
      },
      horaPublicacao: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      fonte: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Noticias');
  }
};