const mongoose = require("mongoose");

const Project = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    projectDescription: {
      type: String,
    },
    statusId: {
      type: String,
    },
    categoryIds: {
      type: String,
    },
    roofSize: {
      type: String,
    },
    vat: {
      type: Number,
    },
    stateOfRoof: {
      type: String,
    },
    currentRoof: {
      type: String,
    },
    generateDescription: {
      type: Array,
    },
    generateLastDescription: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", Project);
