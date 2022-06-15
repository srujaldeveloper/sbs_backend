const auth = require("../middleware/auth.middleware");

module.exports = app => {
    const templateController = require("../controller/template.controller");

    var router = require("express").Router();

    //create new template
    router.post("/template", auth(), templateController.createTemplate);

    //get all template
    router.get("/template", auth(), templateController.getAllTemplate);

    //get template by id
    router.get("/template/:id", auth(), templateController.getTemplateById);

    //update template
    router.put("/template/:id", auth(), templateController.updateTemplate);

    //delete template
    router.delete("/template/:id", auth(), templateController.deleteTemplateTypeById);

    //delete all template
    router.delete("/template", auth(), templateController.deleteAllTemplate);

    app.use('/api', router);
};