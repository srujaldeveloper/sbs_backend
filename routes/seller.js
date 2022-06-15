const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const sellerController = require("../controller/seller.controller");

  var router = require("express").Router();

  //create new company
  router.post("/seller",  auth(), sellerController.createSeller);

  //update company
  router.put("/seller/:id",  auth(), sellerController.updateCompany);

  //delete company
  router.delete("/seller/:id", auth(), sellerController.deleteSellerById);

  //get all company
  router.get("/seller", auth(), sellerController.getAllSeller);

  //get compnay by id
  router.get("/seller/:id", auth(), sellerController.getSellerById);
  
  //delete all seller
  router.delete("/seller", auth(), sellerController.deleteSeller);

  app.use('/api', router);
};