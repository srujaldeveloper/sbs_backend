const auth = require("../middleware/auth.middleware");

module.exports = (app) => {
    const textCategoryController = require("../controller/textcategory.controller");
  
    var router = require("express").Router();
  
    //create new textCategory
    router.post("/textcategory", textCategoryController.createTextCategory);
  
    //get all textCategory
    router.get("/textcategory", textCategoryController.getAllTextCategory);

    //get textCategory by id
    router.get("/textcategory/:id", textCategoryController.getTextCategoryById);
  
    // update textCategory
    router.put("/textcategory/:id", textCategoryController.updateTextCategory);
  
    // delete textCategory
    router.delete("/textcategory/:id", textCategoryController.deleteTextCategory);
  
    app.use("/api", router);
  };