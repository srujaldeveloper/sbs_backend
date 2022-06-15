const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const costTypeController = require("../controller/costtype.controller");

  var router = require("express").Router();

  //create new costtype
  router.post("/costtype",  costTypeController.createCostType);

  //get all costtype
  router.get("/costtype",  costTypeController.getAllCostType);

  //get costtype by id
  router.get("/costtype/:id",  costTypeController.getProjectById);


  //update costtype
  router.put("/costtype/:id",  costTypeController.updateCostType);

  //delete costtype
  router.delete("/costtype/:id",  costTypeController.deleteCostTypeById);

  //delete all costtype
  router.delete("/costtype",  costTypeController.deleteAllCostType);

  router.get("/costtypebypricelist/:id",  costTypeController.getCostTypeByPriceList);

  

  app.use('/api', router);
};