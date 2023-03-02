'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Noticias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Noticias.init({
    titulo: DataTypes.STRING,
    urlTexto: DataTypes.STRING,
    urlImagem: DataTypes.STRING,
    dataPublicacao: DataTypes.STRING,
    horaPublicacao: DataTypes.STRING,
    autor: DataTypes.STRING,
    fonte: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Noticias',
  });
  return Noticias;
};