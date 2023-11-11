const { Router } = require("express");
const controllerCand = require("../controllers/candidato");
const { canViewPanel, checkUser } = require("../middleware/auth");

const router = Router();

router.route("/home").get(controllerCand.homeCandidato);
router
  .route("/login", checkUser)
  .get(controllerCand.login_get)
  .post(controllerCand.login_post);
router
  .route("/cadastro")
  .get(controllerCand.cadastro_get)
  .post(controllerCand.cadastro_post);
router
  .route(["/painel/:user_id", "/painel/"])
  .get(canViewPanel, controllerCand.painel);

module.exports = router;
