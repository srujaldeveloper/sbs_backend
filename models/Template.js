const mongoose = require("mongoose");

const Template = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        description:{
            type:String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("template", Template);
