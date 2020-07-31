const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectContributorSchema = require("./ProjectContributor").schema;
const VersionSchema = require("./Version").schema;
const Task = require("./Task").schema;

const ProjectSchema = new Schema();

ProjectSchema.add({
  projectName: {
    type: String,
    required: true,
  },
  description: String,
  contributors: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "projectContributor",
      },
    ],
    required: true,
    default: [],
  },
  startedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now,
  },
  completedOn: Date,
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  developmentVersion: {
    type: Schema.Types.ObjectId,
    ref: "version",
  },
  productionVersion: {
    type: Schema.Types.ObjectId,
    ref: "version",
  },
  features: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    required: true,
    default: [],
  },
  bugs: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    required: true,
    default: [],
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
