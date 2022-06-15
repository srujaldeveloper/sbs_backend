
const testCategoryModal = require("../models/TextCategory");

//Create new TextCategory
exports.createTextCategory = async (req, res) => {
  try {
    const newTextCategory = new testCategoryModal({
      name: req.body.name,
   
    });
    const saveTextCategory = await newTextCategory.save();

    res.status(200).json(saveTextCategory);

  } catch (err) {
    res.status(500).json(err)
  }
};

//Get all TextCategory
exports.getAllTextCategory = async (req, res) => {
  try {
    await testCategoryModal.find().then(data => {
      if (data) {
        res.status(200).send(data);
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};

//get TextCategory by id
exports.getTextCategoryById = (req, res) => {
  const id = req.params.id;
  testCategoryModal.findById(id)
      .then(data => {
          if (!data)
              res.status(404).send({
                  status: 404,
                  message: "Not found Status with id " + id
              });
          else res.send(data)
      })
      .catch(err => {
          res
              .status(500)
              .send({
                  status: 500,
                  message: "Error retrieving Status with id=" + id
              });
      });
};


// delete Test Category
exports.deleteTextCategory = (req, res) => {
    const id = req.params.id;
    testCategoryModal
      .findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: 404,
            message: `Cannot delete item with id=${id}. Maybe item was not found!`,
          });
        } else {
          res.send({
            status: 200,
            message: "Test Category was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message: "Could not delete Test Category with id=" + id,
        });
      });
  };
  
  //update Test Category
  exports.updateTextCategory = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    testCategoryModal
      .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: 404,
            message: `Cannot update Test Category with id=${id}. Maybe Test Category was not found!`,
          });
        } else
          res.send({ status: 200, message: "Test Category was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message: "Error updating Test Category with id=" + id,
        });
      });
  };