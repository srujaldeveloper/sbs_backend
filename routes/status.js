const auth = require("../middleware/auth.middleware");

module.exports = app => {
    const authController = require("../controller/status.controller");
  
    var router = require("express").Router();
  
    //create new status
    router.post("/status", authController.createStatus);

    //get all status
    router.get("/status", authController.getAllStatus);

     //get status by id
    router.get("/status/:id",  authController.getStatusById);
  
  
    app.use('/api', router);
  };