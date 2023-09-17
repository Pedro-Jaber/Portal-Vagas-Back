module.exports.homeRepresentante = (req, res) => {
  res.status(200).send("Home Representante");
};

module.exports.login_get = (req, res) => {
  res.status(200).send("Login Representante");
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

module.exports.painel = (req, res) => {
  const { user_id } = req.params;
  res.status(200).send(`Painel [user:${user_id}]`);
};