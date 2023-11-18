const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

const NiveisDeHabilidade = dataBase.sequelize.define(
  "niveisDeHabilidade",
  {
    nivel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

NiveisDeHabilidade.sync();

addNiveis = async () => {
  await NiveisDeHabilidade.bulkCreate([
    { nivel: "Básico" },
    { nivel: "Intermediário" },
    { nivel: "Avançado" },
  ]);
};

module.exports = {
  NiveisDeHabilidade,
  addNiveis,
};
