const router = require("express").Router();
const {
  registerController,
  loginController,
  checkAuthStatusController,
  getAuthStatusController,
} = require("../../controllers/authController");

router.post("/signup", registerController);
router.post("/login", loginController);
router.get("/", checkAuthStatusController, getAuthStatusController);

module.exports = router;
