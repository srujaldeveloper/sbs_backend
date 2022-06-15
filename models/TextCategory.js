const mongoose = require("mongoose");

const TextCategory = new mongoose.Schema(
    {
        name: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("textCategory", TextCategory);