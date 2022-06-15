const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const projectController = require("../controller/project.controller");

  var router = require("express").Router();

  //create new project
  router.post("/project",   projectController.createProject);

  //update project
  router.put("/project/:id",   projectController.updateProject);

  //delete project
  router.delete("/project/:id",  projectController.deleteProject);

  //get all project
  router.get("/project",  projectController.getAllProject);

  //get project by id
  router.get("/project/:id",  projectController.getProjectById);
  
  router.delete("/project",  projectController.deleteAllCompany);

  app.use('/api', router);
};