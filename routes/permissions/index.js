const router = require("express").Router();
const { getPermissions } = require("../../controllers/permissionController");

router.get("/", getPermissions);

module.exports = router;
