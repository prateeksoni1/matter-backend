const router = require("express").Router();
const {
  getProfileController,
  getProfilesController,
  createProfileController,
  getProfileByUsernameController
} = require("../../controllers/profileController");
const {
  checkAuthStatusController
} = require("../../controllers/authController");

router.get("/", checkAuthStatusController, getProfileController);
router.get("/profiles", getProfilesController);
router.get("/:username", getProfileByUsernameController);
router.post("/", checkAuthStatusController, createProfileController);

module.exports = router;
