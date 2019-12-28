const mongoose = require("mongoose");

const ProfileuserSchema = mongoose.Schema({
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
  type: {
    type: String,
    default: "USER"
  }
});

module.exports = mongoose.model("profileUser", ProfileuserSchema, "profiles");
