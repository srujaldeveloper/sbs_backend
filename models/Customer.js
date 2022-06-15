const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isPrimary: {
      type: Boolean,
    },

    // socialsecuritynumber: {
    //     type: Number,
    // },
    // signature: {
    //     type: String,
    // },
    projectId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", Customer);
