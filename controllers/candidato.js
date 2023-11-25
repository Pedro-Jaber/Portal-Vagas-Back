const { Op } = require("sequelize");

const { Candidato } = require("../model/candidato");
const { Vaga } = require("../model/vaga");
const { sequelize } = require("../model/dataBase");

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
    let vagasCadastradas;

    try {
      let vagasArray = [];

      const query = `
      select 
        vc.id as "idVagaCandidato",
        vc."createdAt",
        v.id as "idVaga",
        v.codigo,
        v.empresa, 
        v."cargaHoraria", 
        v.bolsa,
        v.descricao,
        sc.status,
        sc.cor
      from candidato c
      inner join "vagaCandidato" vc
      on vc."idCandidato" = c.id
      inner join vaga v
      on vc."idVaga" = v.id
      inner join "statusCandidatura" sc
      on vc."statusCandidaturaId" = sc.id
      where c.id = '${user_id}'
      order by vc."createdAt" DESC`;

      const queryResult = await sequelize.query(query);
      vagasCadastradas = queryResult[0];

      // TODO Transformar isso em uma so query no banco
      vagasCadastradas.forEach((relacaoVagaCad) => {
        vagasArray.push(relacaoVagaCad.idVaga);
      });

      vagasDisponiveis = await Vaga.findAll({
        where: { id: { [Op.notIn]: vagasArray } },
      });
      // TODO -----------------------------------------
    } catch (error) {
      console.error(error);
      vagasDisponiveis = [];
      vagasCadastradas = [];
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
