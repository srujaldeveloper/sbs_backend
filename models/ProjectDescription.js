const mongoose = require("mongoose");

const ProjectDescription = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    projectId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projectDescription", ProjectDescription);
