const { Candidato } = require("../model/candidato");

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

    res.status(200).render("candidato/painelCandidato", {
      title: candidato.nome,
      candidato,
    });
  } catch (error) {
    res.redirect("/404");
  }
};
