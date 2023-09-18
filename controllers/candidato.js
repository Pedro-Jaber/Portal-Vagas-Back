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

module.exports.painel = (req, res) => {
  const { user_id } = req.params || "";
  if (user_id != "") res.status(200).send(`Painel [user:${user_id}]`);
  res.status(404).send("404"); //TODO alterar para redirect 404
};
