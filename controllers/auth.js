const candidato = require("../model/candidato");
const representante = require("../model/representante");
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

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.loginGet = (req, res) => {
  //TODO impedir que usuario ja logado log novamente fazer redirect para a home
  res.status(200).render("loginGeneric", { title: "Login", acessar: "#" });
};

module.exports.loginPost = async (req, res) => {
  const { email, senha, tag } = req.body; //TODO adicionar a opção de logar com cpf tbm
  console.log(req.body);

  try {
    let user = undefined;
    let role = undefined;
    if (tag === "candidato") {
      user = await candidato.verificaCandidato(email, senha);
      role = tag;
    } else if (tag === "representante") {
      user = await representante.verificaRepresentante(email, senha);
      role = tag;
    } else {
      throw Error("Tag Invalida");
    }
    const token = createToken(user.id, role);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); //TODO Mudar para Https
    res.status(200).json({ user: user.id, token: token }); //TODO redirect para a home ou painel
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    console.log(error);
    res.status(400).render("login", {
      title: "login",
      tag: tag,
      acessar: "#",
      errors: errors,
    });
  }
};
