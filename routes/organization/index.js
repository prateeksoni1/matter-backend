const router = require("express").Router();
const {
  createOrganization,
  getOrganizations
} = require("../../controllers/organizationController");

router.get("/", getOrganizations);
router.get("/", createOrganization);
