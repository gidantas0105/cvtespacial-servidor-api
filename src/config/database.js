require('dotenv').config();
//importa as variaveis contidas no arquivo .env e as associa a obj process.env

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "db",
    "host": "localhost",
    "dialect": "postgres"
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
