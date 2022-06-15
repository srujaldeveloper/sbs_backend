const mongoose = require("mongoose");

const CostType = new mongoose.Schema(
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

module.exports = mongoose.model("costtype", CostType);
