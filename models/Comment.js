const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  replies: {
    type: [
      {
        author: {
          type: mongoose.Types.ObjectId,
          ref: "profile",
          required: true
        },
        reply: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("comment", commentSchema);
