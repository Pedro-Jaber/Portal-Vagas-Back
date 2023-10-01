const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

/*
create table if not exists representante (
  id serial primary key not null,
  nome varchar(100) not null,
  email varchar(100) not null,
  senha varchar(100) not null,
  cpf varchar(14)
);
*/

const Representante = dataBase.sequelize.define(
  "representante",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
    },
  },
  {
    freezeTableName: true,
  },
);

Representante.sync();

module.exports = Representante;
