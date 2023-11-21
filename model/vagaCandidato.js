const { DataTypes } = require("sequelize");
const dataBase = require("./dataBase");

const { Vaga } = require("./vaga");
const { Candidato } = require("./candidato");

const StatusCandidatura = dataBase.sequelize.define(
  "statusCandidatura",
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING(7), //#ffffff
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

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

StatusCandidatura.hasMany(VagaCandidato);
VagaCandidato.belongsTo(StatusCandidatura);

Vaga.belongsToMany(Candidato, {
  through: VagaCandidato,
  foreignKey: "idVaga",
});
Candidato.belongsToMany(Vaga, {
  through: VagaCandidato,
  foreignKey: "idCandidato",
});

StatusCandidatura.sync();
VagaCandidato.sync();

candidatoParticiparDeVaga = async (idCandidato, idVaga) => {
  try {
    const vagaCandidato = await VagaCandidato.create({
      idCandidato,
      idVaga,
      statusCandidaturaId: 1,
    });

    return vagaCandidato;
  } catch (err) {
    return err;
  }
};

candidatoSaiDeVaga = async (idCandidato, idVaga) => {
  try {
    const candidatoSaiVaga = await VagaCandidato.update(
      { statusCandidaturaId: 4 },
      {
        where: {
          idCandidato,
          idVaga,
        },
      },
    );
  } catch (error) {}
};

module.exports = {
  StatusCandidatura,
  VagaCandidato,
  candidatoParticiparDeVaga,
  candidatoSaiDeVaga,
};
