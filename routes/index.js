const authRouter = require("./auth");
const profileRouter = require("./profile");
const projectRouter = require("./project");
const organizationRouter = require("./organization");
const permissionsRouter = require("./permissions");

module.exports = {
  authRouter,
  profileRouter,
  projectRouter,
  organizationRouter,
  permissionsRouter
};
