const Sequelize = require("sequelize");

// Database conection
const sequelize = new Sequelize("jobmatchTest", "postgres", "2662", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  Sequelize,
  sequelize,
};
