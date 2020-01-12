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
  type: {
    type: String,
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
      ref: "profile"
    }
  ],
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "profile"
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
  priority: {
    type: Number,
    default: 1
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
