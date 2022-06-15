
const priceListModal = require("../models/PriceList");

//Create new pricelist
exports.createPriceList = async (req, res) => {
    try {
        const newPriceList = new priceListModal({
            name: req.body.name,
            longDescription:req.body.longDescription,
            shortDescription:req.body.shortDescription,
            projectDetails:req.body.projectDetails,
            costtypeId:req.body.costtypeId,
            categoryId:req.body.categoryId,
            group:req.body.group,
            priceGroup:req.body.priceGroup,
            unit:req.body.unit,
            quantity:req.body.quantity,
            price:req.body.price,
            sortOrder:req.body.sortOrder,
            base:req.body.base,
        });
    
        newPriceList.save(newPriceList)
          .then(data => {
            res.send({
              status: 200,
              data: data
            });
          })
          .catch(err => {
            res.status(500).send({
              status: 500,
              message: err.message || "Some error occurred while creating the priceList."
            });
          });
    
      } catch (err) {
        res.status(500).json(err)
      }
  
};



//update pricelist
exports.updatePriceList = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    priceListModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot update priceList with id=${id}. Maybe priceList was not found!`
                });
            } else res.send({ status: 200, message: "priceList was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Error updating priceList with id=" + id
            });
        });
};


//Get all pricelist
exports.getAllPriceList = async (req, res) => {
    try {

        await priceListModal.find().then(data => {
            if (data) {
                res.send(data)
            }
        })

    } catch (err) {
        res.status(500).json(err);
    }
};


// delete pricelist
exports.deletePriceList = (req, res) => {
    const id = req.params.id;
    priceListModal.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot delete pricelist with id=${id}. Maybe pricelist was not found!`
                });
            } else {
                res.send({
                    status: 200,
                    message: "Pricelist was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete pricelist with id=" + id
            });
        });
};

// get pricelist by id
exports.getPriceListById = (req, res) => {
    const id = req.params.id;
    priceListModal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found Pricelist with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving pricelist with id=" + id
                });
        });
};

//delete all pricelist
exports.deleteAllPriceList = (req, res) => {
    priceListModal.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} PriceList were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all PriceList."
            });
        });
};




