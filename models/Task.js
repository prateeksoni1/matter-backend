const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectContributor = require("./ProjectContributor").schema;
const TestCase = require("./TestCase").schema;

const TaskSchema = new Schema();

TaskSchema.add({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: [TestCase],
  assignedTo: [ProjectContributor],
  assignedBy: [ProjectContributor],
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
  priority: {
    type: Number,
    default: 1
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
