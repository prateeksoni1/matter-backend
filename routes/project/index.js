const router = require("express").Router();
const {
  createProjectController
} = require("../../controllers/projectController");

router.post("/", createProjectController);
