const router = require("express").Router();
const {
  createOrganization,
  getOrganizations,
  getRoles,
} = require("../../controllers/organizationController");
const {
  checkAuthStatusController,
} = require("../../controllers/authController");

router.get("/", getOrganizations);
router.get("/roles", checkAuthStatusController, getRoles);
router.post("/", createOrganization);

module.exports = router;
