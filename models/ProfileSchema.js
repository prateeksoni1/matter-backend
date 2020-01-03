const mongoose = require("mongoose");
const ProjectSchema = require("./ProjectSchema").schema;

const ProfileSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minLength: 5
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  projects: {
    type: [ProjectSchema],
    required: true,
    default: []
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
