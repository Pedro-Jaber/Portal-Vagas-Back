const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

const { Vaga } = require("./vaga");
const { Candidato } = require("./candidato");
/*
create table if not exists vagaCandidato (
  id serial primary key not null,
  id_Candidato interger not null,
  id_Vaga interger not null,
  statusAplicacao interger not null references statusAplicacao(id),
  dataInicioContrato date,
  dataFimContrato date,
);

create table if not exists  statusAplicacao (
  id serial primary key not null,
  status varchar(50) not null
)
*/

const VagaCandidato = dataBase.sequelize.define(
  "vagaCandidato",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  },
);

Vaga.belongsToMany(Candidato, {
  through: "vagaCandidato",
  foreignKey: "idVaga",
});
Candidato.belongsToMany(Vaga, {
  through: "vagaCandidato",
  foreignKey: "idCandidato",
});

VagaCandidato.sync();

candidatoParticiparDeVaga = async (idCandidato, idVaga) => {
  try {
    const vagaCandidato = await VagaCandidato.create({
      idCandidato,
      idVaga,
    });

    return vagaCandidato;
  } catch (err) {
    return err;
  }
};

module.exports = {
  VagaCandidato,
  candidatoParticiparDeVaga,
};
