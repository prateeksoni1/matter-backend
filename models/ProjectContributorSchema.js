const mongoose = require("mongoose");

const ProjectContributorSchema = mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("projectContributor", ProjectContributorSchema);
