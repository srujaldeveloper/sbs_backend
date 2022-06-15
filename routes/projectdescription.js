
module.exports = app => {
  const projectDescriptionController = require("../controller/projectdescription.cotroller");

  var router = require("express").Router();

  //create new pricelist
  router.post("/projectdescription",   projectDescriptionController.createProjectDescription);

   //get project by id
  router.get("/projectdescription/:id",  projectDescriptionController.getProjectDescriptionById);

   //get all status
   router.get("/projectdescription",  projectDescriptionController.getAllProjectDescription);
 
  app.use('/api', router);
};