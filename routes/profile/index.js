const router = require("express").Router();
const {
  getProfileController,
  createProfileController
} = require("../../controllers/profileController");

router.get("/", getProfileController);
router.post("/", createProfileController);

module.exports = router;
