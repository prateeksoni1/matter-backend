const mongoose = require("mongoose");
const ProfileSchema = require("./ProfileSchema").schema;

const VersionSchema = mongoose.Schema({
  version: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  createdBy: {
    type: ProfileSchema,
    required: true
  }
});

module.exports = mongoose.model("version", VersionSchema);
