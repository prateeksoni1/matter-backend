const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController,
  checkAuthStatusController,
  getAuthStatusController,
} = require("../../controllers/authController");

router.post("/signup", registerController);
router.post("/login", loginController);
router.get("/logout", checkAuthStatusController, logoutController);
router.get("/", checkAuthStatusController, getAuthStatusController);

module.exports = router;
