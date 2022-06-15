module.exports = (app) => {
  const userController = require("../controller/user.controller");
  var router = require("express").Router();
  router.post("/user", userController.addUser);
  // router.get('/user/:userId', authController.getUser);
  // router.get('/user', authController.getAllUser);
  router.put("/user/:id", userController.updateUser);
  router.delete("/user/:id", userController.deleteUserById);
  app.use("/api", router);
};
