const { DataTypes } = require("sequelize");
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
    nascimento: {
      type: DataTypes.DATEONLY,
    },
    cpf: {
      type: DataTypes.STRING(14),
    },
  },
  {
    freezeTableName: true,
  },
);

Candidato.sync();

criarCandidato = async (nome, email, senha, nascimento, cpf) => {
  nascimento = nascimento || null;
  cpf = cpf || null;

  try {
    const candidato = await Candidato.create({
      nome,
      email,
      senha,
      nascimento,
      cpf,
    });

    return candidato;
  } catch (err) {
    return err;
  }
};

module.exports = {
  Candidato,
  criarCandidato,
};
