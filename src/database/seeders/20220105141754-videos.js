'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Videos', [{
      titulo: "CVT-E | Conheça o Centro Vocacional Tecnológico Espacial Augusto Severo",
      url: "https://www.youtube.com/embed/CpXoP5ZP54c",
      imagem: "https://www.gov.br/aeb/pt-br/acoes-e-programas/centro-vocacional-tecnologico-espacial/centro-vocacional-tecnologico-espacia/@@collective.cover.banner/ad4b3ada-0330-485c-86aa-55e3745c3adb/@@images/59157f7e-3979-4bec-9b64-e1ed514e4443.jpeg",
      categoria: "CVT-E",
      fonte: "Agência Espacial Brasileira",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
