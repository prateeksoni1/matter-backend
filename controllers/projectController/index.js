const Project = require("../../models/Project");
const Profile = require("../../models/Profile");
const Contributor = require("../../models/ProjectContributor");
const Task = require("../../models/Task");
const User = require("../../models/User");

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate({
        path: "assignedTo",
        populate: "profile",
      })
      .populate({
        path: "assignedBy",
        populate: "profile",
      });

    if (!task) {
      return res.status(404).json({ success: false, message: "No task found" });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addTaskController = async (req, res) => {
  const {
    title,
    description,
    type,
    assignedTo,
    assignedBy,
    priority,
    testCases,
    projectId,
  } = req.body;

  try {
    const project = await Project.findById(projectId);

    const task = new Task({
      title,
      description,
      type,
      assignedTo,
      assignedBy,
      priority,
      testCases,
    });
    await task.save();
    project[`${type.toLowerCase()}s`].push(task._id);
    await project.save();

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const editTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.updateOne({ _id: id }, req.body);
    return res.json({
      success: true,
      task,
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err,
    });
  }
};

const getTasks = async (req, res) => {
  let { projectId, type } = req.query;

  const { user: userId } = req.user;

  const user = await User.findById(userId);

  type = type.toLowerCase();
  try {
    const project = await Project.findById(projectId).populate({
      path: `${type}s`,
      populate: [
        // {
        //   path: "testCases",
        // },
        {
          path: "assignedTo",
          populate: "profile",
        },
        {
          path: "assignedBy",
          populate: "profile",
        },
      ],
    });

    let tasks = project[`${type}s`];

    tasks = tasks.filter((task) => {
      if (
        task.assignedTo.find((ct) => {
          return ct.profile._id.toString() === user.profile.toString();
        })
      ) {
        return task;
      }
    });

    return res.json({
      success: true,
      [`${type}s`]: tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const createProjectController = async (req, res) => {
  const { projectName, description, contributors } = req.body;

  try {
    const contributorIds = [];
    contributors.forEach((contributor) => {
      const newContributor = new Contributor({
        ...contributor,
      });
      newContributor.save();
      contributorIds.push(newContributor._id);
    });
    const project = new Project({
      projectName,
      description,
      contributors: contributorIds,
    });
    await project.save();
    contributors.forEach(async (contributor) => {
      const contributorProfile = await Profile.findById(contributor.profile);
      contributorProfile.projects.push(project._id);
      await contributorProfile.save();
    });

    contributors.forEach(async (contributor) => {
      const contributorProfile = await Profile.findById(contributor.profile);
    });

    return res.json({
      success: true,
      project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
    });
  }
};

const getProjectsById = async (req, res) => {
  const { user: userId } = req.user;
  try {
    const user = await User.findById(userId);

    const profile = await Profile.findById(user.profile).populate({
      path: "projects",
      populate: {
        path: "contributors",
        populate: "profile",
      },
    });
    return res.json({
      success: true,
      projects: profile.projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
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
        project,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  createProjectController,
  getProjectsById,
  getProjectByName,
  addTaskController,
  getTasks,
  editTaskController,
  getTask,
};
