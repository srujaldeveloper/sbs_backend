const mongoose = require("mongoose");

const Image = new mongoose.Schema(
    {
        
        logo:{
            type:String,
        },
        imageUrl:{
            type:String,  
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("image", Image);
