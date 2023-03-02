'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Fotos', [{
      titulo: "Centro Vocacional Tecnológico Espacial",
      urlImagem: "https://www.gov.br/aeb/pt-br/acoes-e-programas/centro-vocacional-tecnologico-espacial/centro-vocacional-tecnologico-espacia/@@collective.cover.banner/ad4b3ada-0330-485c-86aa-55e3745c3adb/@@images/59157f7e-3979-4bec-9b64-e1ed514e4443.jpeg",
      fonte: "Agência Espacial Brasileira",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Fotos', null, {});
  }
};
