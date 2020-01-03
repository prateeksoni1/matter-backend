const mongoose = require("mongoose");
const { Schema } = mongoose;

const VersionSchema = new Schema();

VersionSchema.add({
  version: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
});

module.exports = Version = mongoose.model("version", VersionSchema);
