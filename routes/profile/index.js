const router = require("express").Router();
const { getProfileController } = require("../../controllers/profileController");

router.get("/", getProfileController);

module.exports = router;
