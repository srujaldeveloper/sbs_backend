const itemModal = require("../models/Item");
const priceListModal = require("../models/PriceList");

//Create new item
exports.createItem = async (req, res) => {
  try {
    console.log("item", req.body);
    const newItem = new itemModal({
      projectId: req.body.projectId,
      priceListId: req.body.priceListId,
      amount: req.body.amount,
      modifiedPrice: req.body.modifiedPrice,
      quantity: req.body.quantity,
      invoice: req.body.invoice,
      total: req.body.total,
    });

    newItem
      .save(newItem)
      .then((data) => {
        res.send({
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the item.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all item
exports.getAllItem = async (req, res) => {
  try {
    await itemModal.find().then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete item
exports.deleteItem = (req, res) => {
  const id = req.params.id;
  itemModal
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
          message: "Item was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Could not delete item with id=" + id,
      });
    });
};

//update item
exports.updateItem = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  itemModal
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot update item with id=${id}. Maybe item was not found!`,
        });
      } else
        res.send({ status: 200, message: "item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error updating item with id=" + id,
      });
    });
};

//Get item by id
exports.getItemByProjectId = (req, res) => {
  const id = req.params.id;
  itemModal
    .find({ projectId: id })
    .then((data) => {
      console.log("Get item by id", data);
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found Pricelist with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving pricelist with id=" + id,
      });
    });
};

//Get item by id for get Group data
exports.getItemGroupByProjectId = (req, res) => {
  const id = req.params.id;
  priceListModal
    .findOne({ _id: id })
    .then((data) => {
      if (data.group) {
        getItemByGroupName(data.group, res);
      }
      else{
        res.send([]);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving pricelist with id=" + id,
      });
    });
};

getItemByGroupName = (group, res) => {
  priceListModal.find({ group: group }).then((data) => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found item with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving item with id=" + id,
      });
    });
};
