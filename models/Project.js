const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectContributorSchema = require("./ProjectContributor").schema;
const VersionSchema = require("./Version").schema;
const Task = require("./Task").schema;

const ProjectSchema = new Schema();

ProjectSchema.add({
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
    default: Date.now()
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now()
  },
  completedOn: Date,
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  developmentVersion: VersionSchema,
  productionVersion: VersionSchema,
  features: [
    {
      type: [Task],
      required: true,
      default: []
    }
  ],
  bugs: [
    {
      type: [Task],
      required: true,
      default: []
    }
  ]
});

module.exports = Project = mongoose.model("project", ProjectSchema);
