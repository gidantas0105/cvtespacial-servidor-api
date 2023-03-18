require('dotenv').config();
//importa as variaveis contidas no arquivo .env e as associa a obj process.env

module.exports = {
  "development": {
    "username": "root",
    "password": "gigi1dantas",
    "database": "cvt_db_teste",
    "host": "localhost",
    "dialect": "mariadb"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "database_production",
    "host": "localhost",
    "dialect": "postgres"
  }
}
