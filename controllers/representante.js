const { Representante } = require("../model/representante");

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

    res.status(200).render("representante/painelRepresentante", {
      title: representante.nome,
      representante,
    });
  } catch (error) {
    res.redirect("/404");
  }
};
