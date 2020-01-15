const router = require("express").Router();
const {
  createProjectController,
  getProjectsById,
  getProjectByName,
  getTasks,
  addTaskController,
  editTaskController
} = require("../../controllers/projectController");

router.post("/", createProjectController);
router.post("/task", addTaskController);
router.get("/tasks", getTasks);
router.put("/task/:id", editTaskController);
router.get("/projects", getProjectByName);
router.get("/:id", getProjectsById);

module.exports = router;
