const dataBase = require("./dataBase");

/* 
create table if not exists vaga (
	id serial primary key not null,
	cargaHoraria integer not null,
	bolsa money not null,
	descricao text
);
*/

const Vaga = dataBase.sequelize.define(
  "vaga",
  {
    cargaHoraria: {
      type: dataBase.Sequelize.INTEGER,
      allowNull: false,
    },
    bolsa: {
      type: dataBase.Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: dataBase.Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "vaga",
  },
);

// Vaga.sync({ force: true });

module.exports = Vaga;
