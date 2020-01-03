const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestCaseSchema = new Schema();

TestCaseSchema.add({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("testCase", TestCaseSchema);
