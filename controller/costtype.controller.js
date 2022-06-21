const costTypeModal = require("../models/CostType");
const priceListModal = require("../models/PriceList");

//Create new project
exports.createCostType = async (req, res) => {
  try {
    const newCost = new costTypeModal({
      name: req.body.name,
      description: req.body.description,
    });

    newCost
      .save(newCost)
      .then((data) => {
        res.send({
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the CostType.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all costtype
exports.getAllCostType = async (req, res) => {
  try {
    await costTypeModal.find().then((data) => {
      if (data) {
        res.send(data);
        //res.status(200).send({ data: data });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get costtype by id
exports.getProjectById = (req, res) => {
  const id = req.params.id;
  costTypeModal
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found CostType with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving CostType with id=" + id,
      });
    });
};
//update costtype
exports.updateCostType = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  costTypeModal
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot update CostType with id=${id}. Maybe CostType was not found!`,
        });
      } else
        res.send({
          status: 200,
          message: "CostType was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error updating CostType with id=" + id,
      });
    });
};

//delete costtype
exports.deleteCostTypeById = (req, res) => {
  const id = req.params.id;
  costTypeModal
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot delete costtype with id=${id}. Maybe Costtype was not found!`,
        });
      } else {
        res.send({
          status: 200,
          message: "Costtype was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Could not delete project with id=" + id,
      });
    });
};

//delete all cost
exports.deleteAllCostType = (req, res) => {
  costTypeModal
    .deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} CostType were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CostType.",
      });
    });
};

//delete all cost
exports.getCostTypeByPriceList = async (req, res) => {
  const id = req.params.id;
  priceListModal.findOne({ _id: id }).then(async (data) => {
    getCostType(data, res);
  });
};

getCostType = async (data, res) => {
  let costTypeData = await costTypeModal.findById({
    _id: data.costtypeId,
  });
  await res.send({
    status: 200,
    data: data,
    costypeName: costTypeData.name,
  });
};
