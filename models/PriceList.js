const mongoose = require("mongoose");

const PriceList = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        shortDescription:{
            type:String,
        },
        longDescription:{
            type:String,
        },
        projectDetails:{
            type:String,
        },
        costtypeId:{
            type:String,
        },
        categoryId:{
            type:Array,
        },
        group:{
            type:String,
        },
        priceGroup:{
            type:String,
        },
        unit:{
            type:String,
        },
        quantity:{
            type:Number,
        },
        price:{
            type:Number,
        },
        sortOrder:{
            type:Number,
        },
        base:{
            type:Boolean,
        }, 
    },
    { timestamps: true }
);

module.exports = mongoose.model("priceList", PriceList);
