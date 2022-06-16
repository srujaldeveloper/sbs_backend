const imageModal = require("../models/Image");

//Create new Company
exports.createImage = async (req, res) => {
  try {
    if (
      req.file != undefined &&
      req.file.originalname != undefined &&
      req.file.originalname != null
    ) {
      req.body.logo = req.file.originalname;
      req.body.imageUrl = "https://sbsbackend.herokuapp.com/" + req.file.filename;
      // req.body.imageUrl = req.file.filename;

    }
    const newImage = new imageModal({
      logo: req.body.logo,
      imageUrl: req.body.imageUrl,
    });
    
    const saveImage = await newImage.save();
    res.send(saveImage);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Get all company
exports.getAllImage = async (req, res) => {
  try {
    await imageModal.find().then((data) => {
      if (data) {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//update compnay
// exports.updateImage = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }
//   const id = req.params.id;
//   imageModal
//     .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           status: 404,
//           message: `Cannot update Compnay with id=${id}. Maybe Compnay was not found!`,
//         });
//       } else
//         res.send({ status: 200, message: "Compnay was updated successfully." });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         status: 500,
//         message: "Error updating Compnay with id=" + id,
//       });
//     });
// };

exports.updateImage = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  if (
    req.file != undefined &&
    req.file.originalname != undefined &&
    req.file.originalname != null
  ) {
    req.body.logo = req.file.originalname;
    req.body.imageUrl = "https://sbsbackend.herokuapp.com/" + req.file.filename;
    // req.body.imageUrl = req.file.filename;

  }
  console.log("iimaaaaaaggggggggeeeee", req.body)

  imageModal.findByIdAndUpdate(id,  req.body, { useFindAndModify: false })
    .then((data) => {
      console.log("iimaaaaaaggggggggeeeee", req.body)
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot update Compnay with id=${id}. Maybe Compnay was not found!`,
        });
      } else
        res.send({ status: 200, message: "Compnay was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error updating Compnay with id=" + id,
      });
    });
};

exports.deleteImage = (req, res) => {
  const id = req.params.id;
  imageModal
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot delete Compnay with id=${id}. Maybe Compnay was not found!`,
        });
      } else {
        res.send({
          status: 200,
          message: "Compnay was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Could not delete Compnay with id=" + id,
      });
    });
};

exports.getImageById = (req, res) => {
  const id = req.params.id;
  imageModal
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found Compnay with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving Compnay with id=" + id,
      });
    });
};

exports.deleteAllImage = (req, res) => {
    imageModal
    .deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Company were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Company.",
      });
    });
};
