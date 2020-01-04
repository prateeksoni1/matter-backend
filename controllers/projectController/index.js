const firebase = require("../../firebase");
const Project = require("../../models/Project");
const Profile = require("../../models/Profile");

const createProjectController = async (req, res) => {
  const user = firebase.auth().currentUser;

  try {
    const project = new Project(req.body);
    await project.save();

    const profile = await Profile.findOne({ uid: user.id });
    profile.projects.push(project);
    profile.save();

    return res.json({
      success: true,
      project
    });
  } catch (err) {
    return res.status(500).json({
      success: false
    });
  }
};

const getProjectsById = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await Profile.findById(id).projects;
    return res.json({
      success: true,
      projects
    });
  } catch (err) {
    return res.status(500).json({
      success: false
    });
  }
};

module.exports = { createProjectController, getProjectsById };
