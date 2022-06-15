const mongoose = require("mongoose");

const Status = new mongoose.Schema(
    {
        name: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("status", Status);
