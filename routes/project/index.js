const router = require("express").Router();
const {
  createProjectController,
  getProjectsById,
  getProjectByName
} = require("../../controllers/projectController");

router.post("/", createProjectController);
router.get("/projects", getProjectByName);
router.get("/:id", getProjectsById);

module.exports = router;
