const router = require("express").Router();
const {
  checkAuthStatusController,
} = require("../../controllers/authController");
const {
  createProjectController,
  getProjectsById,
  getProjectByName,
  getTasks,
  addTaskController,
  editTaskController,
  getTask,
} = require("../../controllers/projectController");
const { checkPermissions } = require("../../controllers/permissionController");

router.post("/", checkAuthStatusController, createProjectController);
router.post(
  "/task",
  checkAuthStatusController,
  checkPermissions,
  addTaskController
);
router.get("/task/:id", checkAuthStatusController, getTask);
router.get("/tasks", checkAuthStatusController, getTasks);
router.patch(
  "/task/:id",
  checkAuthStatusController,
  checkPermissions,
  editTaskController
);
router.get("/projects", checkAuthStatusController, getProjectByName);
router.get("/", checkAuthStatusController, getProjectsById);

module.exports = router;
