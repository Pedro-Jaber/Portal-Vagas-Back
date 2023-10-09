const { Router } = require("express");
const controllerDB = require("../controllers/bataBase");

const router = Router();

router.route("/createCand").get(controllerDB.createCand);
router.route("/selectCand").get(controllerDB.selectCand);
router.route("/tests").get(controllerDB.test);
router
  .route("/testForm")
  .get(controllerDB.testFormGet)
  .post(controllerDB.testFormPost);

module.exports = router;
