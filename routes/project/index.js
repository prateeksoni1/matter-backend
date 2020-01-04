const router = require("express").Router();
const {
  createProjectController,
  getProjectsById
} = require("../../controllers/projectController");

router.post("/", createProjectController);
router.get("/:id", getProjectsById);
