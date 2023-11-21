const { Router } = require("express");
const controllerDB = require("../controllers/dataBase");

const router = Router();

router.route("/createCand").get(controllerDB.createCand);
router.route("/selectCand").get(controllerDB.selectCand);
router.route("/tests").get(controllerDB.test);
router.route("/representante").get(controllerDB.testRepresentanteGet);
router.route("/vaga").get(controllerDB.testVagaGet);
router.route("/candidato").get(controllerDB.testCandidatoGet);
router.route("/statusInint").get(controllerDB.statusInint);

router.route("/recebeForms").post(controllerDB.testFormPost);

module.exports = router;
