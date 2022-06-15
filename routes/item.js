const auth = require("../middleware/auth.middleware");

module.exports = (app) => {
  const itemController = require("../controller/item.controller");

  var router = require("express").Router();

  //create new item
  router.post("/item", itemController.createItem);

  //get all item
  router.get("/item", itemController.getAllItem);

  // update item
  router.put("/item/:id", itemController.updateItem);

  // delete item
  router.delete("/item/:id", itemController.deleteItem);

  //get item by id
  router.get("/item/:id", itemController.getItemByProjectId);

   //get item group by id
   router.get("/itemgroup/:id", itemController.getItemGroupByProjectId);

  app.use("/api", router);
};
