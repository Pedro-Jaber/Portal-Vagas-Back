const Sequelize = require("sequelize");
require("dotenv").config();

// Database conection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // Set this to true to require SSL
        rejectUnauthorized: false, // Set this to false if you're using self-signed certificates
      },
    },
  },
); //TODO Criar variaveis de ambiente

module.exports = {
  Sequelize,
  sequelize,
};
