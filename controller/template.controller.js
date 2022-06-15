
const templateModal = require("../models/Template");

//Create new project
exports.createTemplate = async (req, res) => {
    try {
        const newTemplate = new templateModal({
            name: req.body.name,
            description: req.body.description,
        });

        newTemplate.save(newTemplate)
            .then(data => {
                res.send({
                    status: 200,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: 500,
                    message: err.message || "Some error occurred while creating the template."
                });
            });

    } catch (err) {
        res.status(500).json(err)
    }
};

//Get all template
exports.getAllTemplate = async (req, res) => {
    try {

        await templateModal.find().then(data => {
            if (data) {
                res.status(200).send({ data: data });
            }
        })

    } catch (err) {
        res.status(500).json(err);
    }
};

//get template by id
exports.getTemplateById = (req, res) => {
    const id = req.params.id;
    templateModal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found template with id " + id
                });
            else res.send({
                status: 200,
                data: data
            });
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving template with id=" + id
                });
        });
};

//update template
exports.updateTemplate = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    templateModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot update template with id=${id}. Maybe template was not found!`
                });
            } else res.send({ status: 200, message: "template was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Error updating template with id=" + id
            });
        });
};


//delete template
exports.deleteTemplateTypeById = (req, res) => {
    const id = req.params.id;
    templateModal.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot delete Template with id=${id}. Maybe Template was not found!`
                });
            } else {
                res.send({
                    status: 200,
                    message: "Template was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete project with id=" + id
            });
        });
};



//delete all template
exports.deleteAllTemplate = (req, res) => {
    templateModal.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Template were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Template."
            });
        });
};


