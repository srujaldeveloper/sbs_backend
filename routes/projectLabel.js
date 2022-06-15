module.exports = (app) => {
  const projectLabelController = require("../controller/projectlabel.cotroller");

  var router = require("express").Router();

  //create new projectlabel
  router.post("/projectlabel", projectLabelController.createProjectLabel);

  //update projectlabel
  router.put("/projectlabel/:id", projectLabelController.updateProjectModel);

  //get projectlabel

  router.get("/projectlabel", projectLabelController.getProjectLabel);

  //get projectlabel by id
  router.get("/projectlabel/:id", projectLabelController.getProjectLabelById);

  //delete project by id
  router.delete("/projectlabel/:id", projectLabelController.deleteProjectLabel);

  app.use("/api", router);
};
