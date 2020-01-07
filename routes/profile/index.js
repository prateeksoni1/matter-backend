const router = require("express").Router();
const {
  getProfileController,
  getProfilesController,
  createProfileController,
  getProfileByUsernameController
} = require("../../controllers/profileController");

router.get("/", getProfileController);
router.get("/profiles", getProfilesController);
router.get("/:username", getProfileByUsernameController);
router.post("/", createProfileController);

module.exports = router;
