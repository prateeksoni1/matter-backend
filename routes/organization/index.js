const router = require("express").Router();
const {
  createOrganization,
  getOrganizations,
  getRoles
} = require("../../controllers/organizationController");

router.get("/", getOrganizations);
router.get("/roles", getRoles);
router.post("/", createOrganization);

module.exports = router;
