const mongoose = require("mongoose");
const { Schema } = mongoose;
const Profile = require("./Profile").schema;
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
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment"
      }
    ],
    default: []
  },
  type: {
    type: String,
    enum: ["BUG", "FEATURE"],
    required: true
  },
  testCases: [
    {
      type: Schema.Types.ObjectId,
      ref: "testCase"
    }
  ],
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "projectContributor"
    }
  ],
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "projectContributor"
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
  status: {
    type: String,
    enum: ["COMPLETE", "DEPLOYED", "TESTING", "INCOMPLETE"],
    default: "INCOMPLETE"
  },
  priority: {
    type: Number,
    default: 1
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
