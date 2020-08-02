const router = require("express").Router();
const { getPermissions } = require("../../controllers/permissionController");
const {
  checkAuthStatusController,
} = require("../../controllers/authController");

router.get("/", checkAuthStatusController, getPermissions);

module.exports = router;
