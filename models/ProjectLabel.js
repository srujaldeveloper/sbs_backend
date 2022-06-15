const mongoose = require("mongoose");

const ProjectLabel = new mongoose.Schema(
    {
        textCategory:{
            type:Array,
        },
        category:{
            type:Array,
        },
        title:{
            type:String,
        },
        text:{
            type:String,
        },
        sortOrder:{
            type:Number,
        },
        sellerId:{
            type:String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("projectLabel", ProjectLabel);
