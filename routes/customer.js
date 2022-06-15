const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const customerController = require("../controller/customer.controller");

  var router = require("express").Router();

  //create new customer
  router.post("/customer", customerController.createCustomer);

  //update customer
  router.put("/customer/:id", customerController.updateCustomer);

  //update isPrimary customer
  router.put("/customer/:id", customerController.updatePrimaryCustomer);

   //delete pricelist
   router.delete("/customer/:id",  customerController.deleteCustomer);

  //get all customer
  router.get("/customer",  customerController.getAllCustomer);

  router.get("/customer/:id",  customerController.getCustomerByProjectId);

  router.get("/getPrimaryCustomer",  customerController.getCustomerByIsPrimary);

  app.use('/api', router);
};