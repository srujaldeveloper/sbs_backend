const mongoose = require("mongoose");

const Item = new mongoose.Schema(
    {
        projectId:{
            type:String,
        },
        priceListId:{
            type:String,
        },
        amount:{
            type:Number,
        },
        modifiedPrice:{
            type:Number,
        },
        quantity:{
            type:Number,
           
        },
        invoice:{
            type:Boolean,
        },
        total:{
            type:Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("item", Item);
