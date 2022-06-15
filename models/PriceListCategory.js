const mongoose = require("mongoose");

const PriceListCategory = new mongoose.Schema(
  {
    priceListId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("priceListCategory", PriceListCategory);
