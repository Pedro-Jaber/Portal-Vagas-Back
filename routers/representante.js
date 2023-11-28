const { Router } = require("express");
const controllerRepr = require("../controllers/representante");
const { canViewPanel, checkUser } = require("../middleware/auth");

const router = Router();

router.route("/home").get(controllerRepr.homeRepresentante);
router
  .route("/login", checkUser)
  .get(controllerRepr.login_get)
  .post(controllerRepr.login_post);
router
  .route("/cadastro-empresa")
  .get(controllerRepr.cadastroEmpresa_get)
  .post(controllerRepr.cadastroEmpresa_post);
router
  .route("/cadastro-representante")
  .get(controllerRepr.cadastroRepresentante_get)
  .post(controllerRepr.cadastroRepresentante_post);
router
  .route(["/painel/:user_id", "/painel/"])
  .get(canViewPanel, controllerRepr.painel);

// TODO Permitir apenas representante logado de acessar essa página
router.route("/criar-vaga").post(controllerRepr.criarVaga);
router
  .route("/selecionar-candidato")
  .post(controllerRepr.selecionarCandidato_POST);
router.route("/eliminar-candidato").post(controllerRepr.eliminarCandidato_POST);

module.exports = router;
