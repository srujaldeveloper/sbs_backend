
module.exports = app => {
    const priceListCategory = require("../controller/pricelistcategory.controller");
  
    var router = require("express").Router();
  
    //create new pricelist
    router.post("/pricelistcategory",   priceListCategory.createPriceListCategory);
  
     //get project by id
    router.get("/pricelistcategory/:id",  priceListCategory.getPriceListCategoryById);
   
    app.use('/api', router);
  };