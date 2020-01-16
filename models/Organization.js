const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissionMatrix: [
    {
      role: {
        type: String,
        required: true
      },
      permissions: {
        type: [
          {
            type: String,
            enum: [
              "create-project",
              "delete-project",
              "edit-project",
              "edit-permissions",
              "create-task",
              "edit-task",
              "delete-task",
              "mark-task-complete",
              "mark-task-testing",
              "mark-task-deployed",
              "mark-task-incomplete"
            ]
          }
        ],
        default: []
      }
    }
  ]
});

module.exports = mongoose.model("organization", OrganizationSchema);
