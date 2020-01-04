const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController,
  checkAuthStatusController
} = require("../../controllers/authController");

router.post("/signup", registerController);
router.post("/login", loginController);
router.get("/logout", checkAuthStatusController, logoutController);

module.exports = router;
