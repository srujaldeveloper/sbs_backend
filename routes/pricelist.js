const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const priceListController = require("../controller/pricelist.controller");
  const { uploadFile } = require('../middleware/multer')

  var router = require("express").Router();

  //create new pricelist
  router.post("/pricelist",   priceListController.createPriceList);

  //update pricelist
  router.put("/pricelist/:id",  priceListController.updatePriceList);

  //delete pricelist
  router.delete("/pricelist/:id",  priceListController.deletePriceList);

  //get all pricelist
  router.get("/pricelist",  priceListController.getAllPriceList);

  //get pricelist by id
  router.get("/pricelist/:id",  priceListController.getPriceListById);
  
  //delete all pricelist
  router.delete("/pricelist",  priceListController.deleteAllPriceList);

  app.use('/api', router);
};