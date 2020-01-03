const mongoose = require("mongoose");
const ProjectContributorSchema = require("./ProjectContributorSchema").schema;
const TestCaseSchema = require("./TestCaseSchema").schema;

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: [TestCaseSchema],
  assignedTo: [ProjectContributorSchema],
  assignedBy: [ProjectContributorSchema],
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
  priority: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("task", TaskSchema);
