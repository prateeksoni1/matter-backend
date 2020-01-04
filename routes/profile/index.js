const router = require("express").Router();
const {
  getProfileController,
  createProfileController,
  getProfileByUsernameController
} = require("../../controllers/profileController");

router.get("/", getProfileController);
router.get("/:username", getProfileByUsernameController);
router.post("/", createProfileController);

module.exports = router;
