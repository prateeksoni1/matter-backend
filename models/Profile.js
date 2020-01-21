const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema();

ProfileSchema.add({
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
  projects: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "project"
      }
    ],
    required: true,
    default: []
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  organization: {
    type: mongoose.Types.ObjectId,
    ref: "organization"
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema, "profiles");
