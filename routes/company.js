const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const companyController = require("../controller/company.controller");
  const { uploadFile } = require('../middleware/multer')

  var router = require("express").Router();

  //create new company
  router.post("/company", uploadFile.single('logo'),  companyController.createCompany);

  //update company
  router.put("/company/:id", uploadFile.single('logo'),  companyController.updateCompany);

  //delete company
  router.delete("/company/:id",  companyController.deleteCompnay);

  //get all company
  router.get("/getAllCompany",  companyController.getAllCompany);

  //get compnay by id
  router.get("/getCompnayById/:id",  companyController.getCompnayById);
  
  router.delete("/company",  companyController.deleteAllCompany);

  app.use('/api', router);
};