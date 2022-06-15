
const categoryModal = require("../models/Category");

//Create new category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new categoryModal({
            name: req.body.name,

        });
        const saveCategory = await newCategory.save();

        res.status(200).json(saveCategory);

    } catch (err) {
        res.status(500).json(err)
    }
};



//update category
exports.updateCategory = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    categoryModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot update Category with id=${id}. Maybe Category was not found!`
                });
            } else res.send({ status: 200, message: "Category was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Error updating Category with id=" + id
            });
        });
};


//Get all cateogry
exports.getAllCategory = async (req, res) => {
    try {

        await categoryModal.find().then(data => {
            if (data) {
                res.send(data)
                // res.status(200).send({ status: 200, data: data });
            }
        })

    } catch (err) {
        res.status(500).json(err);
    }
};


// delete category
exports.deleteCateogryById = (req, res) => {
    const id = req.params.id;
    categoryModal.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot delete category with id=${id}. Maybe category was not found!`
                });
            } else {
                res.send({
                    status: 200,
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete category with id=" + id
            });
        });
};

// get seller by id
exports.getCategoryById = (req, res) => {
    const id = req.params.id;
    categoryModal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found Seller with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving Seller with id=" + id
                });
        });
};

exports.deleteCategory = (req, res) => {
    categoryModal.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Company were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Company."
            });
        });
};


