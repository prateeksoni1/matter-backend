const mongoose = require("mongoose");

const Profile = require("./Profile").schema;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: Profile
});

module.exports = mongoose.model("user", UserSchema);
