const { Router } = require("express");
const controllerRepr = require("../controllers/representante");
const { canViewPanel } = require("../middleware/auth");

const router = Router();

router.route("/home").get(controllerRepr.homeRepresentante);
router
  .route("/login")
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

module.exports = router;
