const jwt = require("jsonwebtoken");
const { Candidato } = require("../model/candidato");

// check if the user is logged in
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists $ is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/auth/login");
      } else {
        //console.log(decodedToken)
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        //console.log(decodedToken)
        let user = await Candidato.findOne({ where: { id: decodedToken.id } });
        // console.log(user);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// Impede que usuário acesse o painel de outro usuário
const canViewPanel = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("auth/login");
      }
      // console.log(decodedToken.id);
      // console.log(req.params.user_id);
      // Verifica se os IDs de usuário são iguais
      if (decodedToken.id == req.params.user_id) {
        next();
      } else {
        res.redirect("/401");
      }
    });
  }
};

module.exports = { requireAuth, checkUser, canViewPanel };
