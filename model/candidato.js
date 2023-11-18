const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

// Tabela do Candidato
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
    //TODO criptografar a senha para colocar no banco de dados
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
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    habilidades: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING(50))),
      // Ex:
      // tecnologia |  nivel
      // -----------|---------
      // HTML/CSS   | avançado
      // Java       | intermediário
      // JavaScript | intermediário
      // NodeJs     | intermediário
      // ...
    },
  },
  {
    freezeTableName: true,
  },
);

Candidato.sync();

// Cria um candidato com os argumentos passados
criarCandidato = async (
  nome,
  email,
  senha,
  telefone,
  habilidades,
  nascimento,
  cpf,
) => {
  nascimento = nascimento || null;
  cpf = cpf || null;

  try {
    // Verifica se a lista de habilidades está vazia
    if (habilidades[0] === undefined) {
      habilidades = null;
    }

    // Cria o candidato
    const candidato = await Candidato.create({
      nome,
      email,
      senha,
      nascimento,
      cpf,
      telefone,
      habilidades,
    });

    return candidato;
  } catch (err) {
    return err;
  }
};

// Verifica as credências do candidato
verificaCandidato = async (email, password) => {
  const user = await Candidato.findOne({ where: { email: email } });
  if (!user) {
    throw Error("Credenciais Incorretas");
  }
  const auth = password == user.senha ? true : false; //TODO descriptografar a senha do banco de dados

  if (!auth) {
    throw Error("Credenciais Incorretas");
  }

  return user;
};

module.exports = {
  Candidato,
  criarCandidato,
  verificaCandidato,
};
