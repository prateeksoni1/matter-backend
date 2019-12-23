const router = require("express").Router();
const {
  registerController,
  loginController,
  authStatusController
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/status", authStatusController);

module.exports = router;
