const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema();

UserSchema.add({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "profile"
  }
});

module.exports = User = mongoose.model("user", UserSchema);
