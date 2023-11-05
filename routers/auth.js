const { Router } = require("express");
const authController = require("../controllers/auth");

const router = Router();

router.route("/loginGeneric").get(authController.loginGet);

router.route("/login").post(authController.loginPost);

router.route("/cadastro").get().post(); //TODO Cadastro
router.route("/logout").get().post(); //TODO Logout

module.exports = router;
