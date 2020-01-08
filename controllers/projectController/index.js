const firebase = require("../../firebase");
const Project = require("../../models/Project");
const Profile = require("../../models/Profile");

const createProjectController = async (req, res) => {
  const user = firebase.auth().currentUser;

  try {
    const project = new Project(req.body);
    await project.save();

    const profile = await Profile.findOne({ uid: user.uid });
    profile.projects.push(project);
    profile.save();

    return res.json({
      success: true,
      project
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false
    });
  }
};

const getProjectsById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id);
    return res.json({
      success: true,
      projects: profile.projects
    });
  } catch (err) {
    return res.status(500).json({
      success: false
    });
  }
};

const getProjectByName = async (req, res) => {
  const { name } = req.query;
  try {
    const project = await Project.findOne({ projectName: name });
    if (project) {
      return res.json({
        success: true,
        project
      });
    } else {
      return res.json({
        success: false
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  }
};

module.exports = { createProjectController, getProjectsById, getProjectByName };
