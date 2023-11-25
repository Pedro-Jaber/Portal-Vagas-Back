const { Representante } = require("../model/representante");
const { Vaga } = require("../model/vaga");

vagasCriadas = async (representanteId) => {
  console.log(representanteId);
  try {
    const vagasCriadas = await Vaga.findAll({
      where: { representanteId },
    });

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
    res.redirect("/404");
  }
};
