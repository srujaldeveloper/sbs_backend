const auth = require("../middleware/auth.middleware");

module.exports = (app) => {
  const imageController = require("../controller/image.controller");
  const { uploadFile } = require("../middleware/multer");

  var router = require("express").Router();

  //create new company
  router.post("/image", uploadFile.single("logo"), imageController.createImage);

  //update company
  router.put(
    "/image/:id",
    uploadFile.single("logo"),
    imageController.updateImage
  );

  //delete company
  router.delete("/image/:id", imageController.deleteImage);

  //get all company
  router.get("/getAllImage", imageController.getAllImage);

  //get compnay by id
  router.get("/getImageById/:id", imageController.getImageById);

  router.delete("/image", imageController.deleteAllImage);

  app.use("/api", router);
};
