const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

/* 
Vaga {
	id,
	cargaHoraria,
	bolsa,
	descricao,

  Data de início de contrato,
  Data de término de contrato,
  Serviço contratado,
}
*/

const Vaga = dataBase.sequelize.define(
  "vaga",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    //TODO substituir "empresa" por "código empresa" uma FK
    empresa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cargaHoraria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bolsa: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

Vaga.sync();

//Função para criar uma vaga no Banco de Dados
// Recebe o nome da empresa, o tempo de trabalho por dia, o valor da bolsa por mês e a descrição do que deve ser realizado
//TODO deve receber o código da empresa uma FK
criarVaga = async (empresa, cargaHoraria, bolsa, descricao) => {
  try {
    const vaga = Vaga.create({
      empresa,
      cargaHoraria,
      bolsa,
      descricao,
    });

    return vaga;
  } catch (error) {
    return err;
  }
};

module.exports = {
  Vaga,
  criarVaga,
};
