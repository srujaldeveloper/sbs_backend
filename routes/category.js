const auth = require("../middleware/auth.middleware");

module.exports = app => {
  const categoryController = require("../controller/category.controller");

  var router = require("express").Router();

  //create new category
  router.post("/cateogry",  categoryController.createCategory);

  //update category
  router.put("/cateogry/:id",  categoryController.updateCategory);

  //delete category
  router.delete("/cateogry/:id", categoryController.deleteCateogryById);

  //delete all seller
  router.delete("/cateogry", categoryController.deleteCategory);

  //get all category
  router.get("/cateogry", categoryController.getAllCategory);

  //get category by id
  router.get("/cateogry/:id", categoryController.getCategoryById);
  


  app.use('/api', router);
};