const Sequelize = require("sequelize");

// Database conection
const sequelize = new Sequelize("jobmatchTest", "postgres", "2662", {
  host: "localhost",
  dialect: "postgres",
}); //TODO Criar variaveis de ambiente

module.exports = {
  Sequelize,
  sequelize,
};
