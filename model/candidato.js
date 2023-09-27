const dataBase = require("./dataBase");

/*
create table if not exists candidato (
  id serial primary key not null,
  nome varchar(100) not null,
  email varchar(100) not null,
  senha varchar(100) not null,
  
  nascimento date,
  cpf varchar(14)
);
*/

const Candidato = dataBase.sequelize.define(
  "candidato",
  {
    nome: {
      type: dataBase.Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: dataBase.Sequelize.STRING(100),
      allowNull: false,
    },
    senha: {
      type: dataBase.Sequelize.STRING(100),
      allowNull: false,
    },
    nascimento: {
      type: dataBase.Sequelize.DATEONLY,
    },
    cpf: {
      type: dataBase.Sequelize.STRING(14),
    },
  },
  {
    tableName: "candidato",
  },
);

//Candidato.sync({ force: true });

module.exports = Candidato;
