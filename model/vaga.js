const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

/* 
Vaga {
	id,
	cargaHoraria,
	bolsa,
	descricao,
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

module.exports = {
  Vaga,
};
