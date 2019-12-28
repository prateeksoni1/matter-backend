const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
