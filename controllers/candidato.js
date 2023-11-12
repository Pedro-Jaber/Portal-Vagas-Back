const { Op } = require("sequelize");

const { Candidato } = require("../model/candidato");
const { Vaga } = require("../model/vaga");
const { VagaCandidato } = require("../model/vagaCandidato");

module.exports.homeCandidato = (req, res) => {
  res.status(200).render("candidato/homeCandidato", {
    title: "Home Candidato",
    acessar: "/candidato/login",
  });
};

module.exports.login_get = (req, res) => {
  if (!res.locals.user) {
    res.status(200).render("login", {
      title: "Login Candidato",
      tag: "candidato",
      acessar: "#",
    });
  } else {
    res.redirect(`/candidato/painel/${res.locals.user.id}`);
  }
};

module.exports.login_post = (req, res) => {
  console.log("tentativa de login");
};

module.exports.cadastro_get = (req, res) => {
  res.status(200).send("Cadastro Candidato");
};

module.exports.cadastro_post = (req, res) => {
  console.log("tentativa de cadastro");
};

module.exports.painel = async (req, res) => {
  const { user_id } = req.params;

  try {
    const candidato = await Candidato.findOne({ where: { id: user_id } });

    let vagasDisponiveis;
    let vagas_CadastradasID;
    let vagasCadastradas;

    try {
      let vagasArray = [];

      const vagas_CadastradasID = await VagaCandidato.findAll({
        attributes: ["id", "idVaga"],
        where: { idCandidato: user_id },
      });

      // console.log(vagas_CadastradasID);

      vagas_CadastradasID.forEach((relacaoVagaCad) => {
        vagasArray.push(relacaoVagaCad.idVaga);
      });

      // console.log(vagasArray);

      vagasCadastradas = await Vaga.findAll({
        where: { id: { [Op.in]: vagasArray } },
      });

      // console.log(vagasCadastradas);

      vagasDisponiveis = await Vaga.findAll({
        where: { id: { [Op.notIn]: vagasArray } },
      });
    } catch (error) {
      vagasDisponiveis = ["undefined"];
      vagas_CadastradasID = ["111"];
      console.log(error);
    }

    res.status(200).render("candidato/painelCandidato", {
      title: candidato.nome,
      candidato,
      vagasCadastradas,
      vagasDisponiveis,
    });
  } catch (error) {
    res.redirect("/404");
  }
};
