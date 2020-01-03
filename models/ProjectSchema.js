const mongoose = require("mongoose");
const ProjectContributorSchema = require("./ProjectContributorSchema").schema;
const VersionSchema = require("./VersionSchema").schema;
const TaskSchema = require("./TaskSchema").schema;

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  contributors: {
    type: [ProjectContributorSchema],
    required: true,
    default: []
  },
  startedOn: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now
  },
  completedOn: Date,
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  developmentVersion: VersionSchema,
  productionVersion: VersionSchema,
  features: {
    type: [TaskSchema],
    required: true,
    default: []
  },
  bugs: {
    type: [TaskSchema],
    required: true,
    default: []
  }
});

module.exports = mongoose.model("project", ProjectSchema);
