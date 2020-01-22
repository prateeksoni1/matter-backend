const router = require("express").Router();
const {
  checkAuthStatusController
} = require("../../controllers/authController");
const {
  createProjectController,
  getProjectsById,
  getProjectByName,
  getTasks,
  addTaskController,
  editTaskController
} = require("../../controllers/projectController");
const { checkPermissions } = require("../../controllers/permissionController");

router.post(
  "/",
  checkAuthStatusController,
  checkPermissions("create-project"),
  createProjectController
);
router.post(
  "/task",
  checkAuthStatusController,
  checkPermissions("create-task"),
  addTaskController
);
router.get("/tasks", checkAuthStatusController, getTasks);
router.put(
  "/task/:id",
  checkAuthStatusController,
  checkPermissions("edit-task"),
  editTaskController
);
router.get("/projects", checkAuthStatusController, getProjectByName);
router.get("/:id", checkAuthStatusController, getProjectsById);

module.exports = router;
