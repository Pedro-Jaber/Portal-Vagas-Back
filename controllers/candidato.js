const { Candidato } = require("../model/candidato");

module.exports.homeCandidato = (req, res) => {
  res.status(200).send("Home Candidato");
};

module.exports.login_get = (req, res) => {
  res.status(200).send("Login Candidato");
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

    res.status(200).render("candidato/painelCandidato", {
      title: candidato.nome,
      candidato,
    });
  } catch (error) {
    res.redirect("/404");
  }
};
