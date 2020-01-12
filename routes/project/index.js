const router = require("express").Router();
const {
  createProjectController,
  getProjectsById,
  getProjectByName,
  getTasks,
  addTaskController
} = require("../../controllers/projectController");

router.post("/", createProjectController);
router.post("/task", addTaskController);
router.get("/projects", getProjectByName);
router.get("/projects/:projectId/tasks", getTasks);
router.get("/:id", getProjectsById);

module.exports = router;
