const { Representante } = require("../model/representante");
const { Vaga, criarVaga } = require("../model/vaga");
const { Candidato } = require("../model/candidato");
const {
  StatusCandidatura,
  VagaCandidato,
  selecionarCandidato,
  eliminarCandidato,
} = require("../model/vagaCandidato");
const { sequelize } = require("../model/dataBase");

vagasCriadas = async (representanteId) => {
  // console.log("\n\n\n\n\n\n");

  try {
    //TODO ARRUMA ESSA MERDA PRA VIR O STATUS JUNTO
    const vagasCriadas = await Vaga.findAll({
      where: { representanteId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Candidato,
          through: [
            {
              model: VagaCandidato,
              include: [
                {
                  model: StatusCandidatura,
                },
              ],
            },
          ],
        },
      ],
    });

    // const test = await VagaCandidato.findAll({
    //   attributes: ["id"],
    //   include: [
    //     {
    //       model: Vaga,
    //       where: { representanteId },
    //     },
    //     {
    //       model: Candidato,
    //     },
    //     {
    //       model: StatusCandidatura,
    //     },
    //   ],
    // });

    // console.log(test);
    // console.log("\n\n\n");
    // test.forEach((rec) => {
    //   console.log(rec.vaga.codigo);
    //   console.log(rec.vaga.empresa);
    //   console.log(rec.candidato.nome);
    //   console.log(rec.statusCandidatura.status);
    //   console.log("\n\n\n");
    //   // vaga.candidatos.forEach((candidato) => {
    //   //   // console.log(candidato.vagaCandidato);
    //   //   // candidato.vagaCandidatos.forEach((sla) => {
    //   //   //   // console.log(sla);
    //   //   // });
    //   // });
    // });
    // vagasCriadas.forEach((vaga) => {
    //   console.log(vaga.candidatos);
    //   console.log("\n\n\n");
    //   vaga.candidatos.forEach((candidato) => {
    //     // console.log(candidato.vagaCandidato);
    //     // candidato.vagaCandidatos.forEach((sla) => {
    //     //   // console.log(sla);
    //     // });
    //   });
    // });
    return vagasCriadas;
  } catch (error) {
    console.error(error);
  }
};

module.exports.homeRepresentante = (req, res) => {
  res.status(200).render("representante/homeRepresentante", {
    title: "Home Representante",
    acessar: "/representante/login",
  });
};

module.exports.login_get = (req, res) => {
  if (!res.locals.user) {
    res.status(200).render("login", {
      title: "Login Representante",
      tag: "representante",
      acessar: "#",
    });
  } else {
    res.redirect(`/representante/painel/${res.locals.user.id}`);
  }
};

module.exports.login_post = (req, res) => {
  console.log("tentativa de login");
};

module.exports.cadastroEmpresa_get = (req, res) => {
  res.status(200).send("Cadastro Empresa");
};

module.exports.cadastroEmpresa_post = (req, res) => {
  console.log("tentativa de cadastro");
};

module.exports.cadastroRepresentante_get = (req, res) => {
  res.status(200).send("Cadastro Representante");
};

module.exports.cadastroRepresentante_post = (req, res) => {
  console.log("tentativa de cadastro");
};

module.exports.painel = async (req, res) => {
  const { user_id } = req.params;

  try {
    const representante = await Representante.findOne({
      where: { id: user_id },
    });

    const vagasCriadasLista = await vagasCriadas(user_id);

    res.status(200).render("representante/painelRepresentante", {
      title: representante.nome,
      representante,
      vagasCriadasLista,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/404");
  }
};

// TODO lidar com erros e tratar a entrada do usurário
module.exports.criarVaga = async (req, res) => {
  const { empresa, cargaHoraria, bolsa, descricao, representanteId } = req.body;

  try {
    criarVaga(empresa, cargaHoraria, bolsa, descricao, representanteId);
    res.status(200).json({ mensagem: "ok" });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.selecionarCandidato_POST = async (req, res) => {
  const { vagaId, candidatoId } = req.body;

  try {
    selecionarCandidato(vagaId, candidatoId);
    res.status(200).json({ mensagem: "ok" });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.eliminarCandidato_POST = async (req, res) => {
  const { vagaId, candidatoId } = req.body;

  try {
    eliminarCandidato(vagaId, candidatoId);
    res.status(200).json({ mensagem: "ok" });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};
