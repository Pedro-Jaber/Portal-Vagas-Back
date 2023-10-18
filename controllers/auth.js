const candidato = require("../model/candidato");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

// handle errors
const handleErrors = (error) => {
  //console.log(err.message, err.code, err.errors)
  let errors = { credenciais: "", email: "" };

  // Credenciais Incorretas
  if (error.message === "Credenciais Incorretas") {
    errors.credenciais = "Credenciais Incorretas";
  }

  // // Email já registrado
  // if (err.code == 11000) {
  //   errors.email = "that email is already registered";
  //   return errors;
  // }

  // // validation errors
  // if (err.message.includes("user validation failed")) {
  //   Object.values(err.errors).forEach(({ properties }) => {
  //     errors[properties.path] = properties.message;
  //   });
  // }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.loginGet = (req, res) => {
  //TODO impedir que usuario ja logado log novamente fazer redirect para a home
  res.status(200).render("login", { title: "login" });
};

module.exports.loginPost = async (req, res) => {
  const { email, senha } = req.body; //TODO adicionar a opção de logar com cpf tbm

  try {
    const user = await candidato.login(email, senha);
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.id }); //TODO redirect para a home
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(400).render("login", { title: "login", errors: errors });
  }
};
