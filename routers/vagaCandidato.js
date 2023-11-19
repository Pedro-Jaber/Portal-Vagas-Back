const { Router } = require("express");
const controllerVG = require("../controllers/vagaCandidato");

const router = Router();

router.route("/candidatar").post(controllerVG.candidatar);

module.exports = router;
