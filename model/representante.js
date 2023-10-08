const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

const { Entropy, charset32 } = require("entropy-string");

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

criarRepresentante = async (nome, email, senha, cpf) => {
  senha = senha || null;
  cpf = cpf || null;

  try {
    const representante = Representante.create({
      nome,
      email,
      senha,
      cpf,
    });

    return representante;
  } catch (err) {
    return err;
  }
};

gerarSenhaTemporaria = () => {
  const entropy = new Entropy({ charset: charset32, bits: 64 });
  return entropy.string();
};

module.exports = {
  Representante,
  criarRepresentante,
  gerarSenhaTemporaria,
};
