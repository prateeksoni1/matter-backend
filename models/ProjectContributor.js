const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectContributorSchema = new Schema();

ProjectContributorSchema.add({
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

module.exports = ProjectContributor = mongoose.model(
  "projectContributor",
  ProjectContributorSchema
);
