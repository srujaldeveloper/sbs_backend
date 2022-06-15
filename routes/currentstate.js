const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const stateController = require("../controller/currentstate.controller");

  var router = require("express").Router();

  //create new state
  router.post("/state",auth(), stateController.createState);

  //get all state
  router.get("/state", auth(), stateController.getAllState);

  app.use('/api', router);
};