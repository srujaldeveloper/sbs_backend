const mongoose = require("mongoose");

const Company = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        logo:{
            type:String,
        },
        address:{
            type:String,
        },
        vat:{
            type:Number,
        },
        imageUrl:{
            type:String,  
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("company", Company);
