'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Noticias', [{
      titulo: "Reunião do G20 mostra a importância da sustentabilidade para o espaço",
      urlTexto: "https://www.gov.br/aeb/pt-br/assuntos/noticias/reuniao-do-g20-mostra-a-importancia-da-sustentabilidade-para-o-espaco",
      urlImagem: "https://www.gov.br/aeb/pt-br/assuntos/noticias/WhatsAppImage20210920at16.16.11.jpeg/@@images/8b02c421-850e-41b9-882a-d79e881d279c.jpeg",
      dataPublicacao: "20/09/2021",
      horaPublicacao: "16:22",
      autor: "Agência Espacial Brasileira",
      fonte: "Agência Espacial Brasileira",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Noticias', null, {});
  }
};
