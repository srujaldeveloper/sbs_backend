
const sellerModal = require("../models/Seller");

//Create new Company
exports.createSeller = async (req, res) => {
  try {
    const newSeller = new sellerModal({
      name: req.body.name,
      title: req.body.title,
   
    });
    const saveSeller = await newSeller.save();

    res.status(200).json(saveSeller);

  } catch (err) {
    res.status(500).json(err)
  }
};



//update seller
exports.updateCompany = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    sellerModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            status: 404,
            message: `Cannot update Compnay with id=${id}. Maybe Compnay was not found!`
          });
        } else res.send({ status: 200, message: "Compnay was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          status: 500,
          message: "Error updating Compnay with id=" + id
        });
      });
  };




//Get all seller
exports.getAllSeller = async (req, res) => {
  try {

    await sellerModal.find().then(data => {
      if (data) {
        res.status(200).send({status:200, data: data });
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};


// delete seller
exports.deleteSellerById = (req, res) => {
  const id = req.params.id;
  sellerModal.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot delete Seller with id=${id}. Maybe Seller was not found!`
        });
      } else {
        res.send({
          status: 200,
          message: "Seller was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Could not delete Seller with id=" + id
      });
    });
};

// get seller by id
exports.getSellerById = (req, res) => {
  const id = req.params.id;
  sellerModal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found Seller with id " + id
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
          message: "Error retrieving Seller with id=" + id
        });
    });
};

exports.deleteSeller = (req, res) => {
  sellerModal.deleteMany({})
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


