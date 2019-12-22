const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
