
const customerModal = require("../models/Customer");

//Create new category
exports.createCustomer = async (req, res) => {
  console.log("call")

  try {
    let isPrimaryExist = await customerModal.findOne({ isPrimary: req.body.isPrimary })
    if (isPrimaryExist !==null && Object.keys(isPrimaryExist) !== 0) {
      res.status(200).json({
        data:isPrimaryExist,
        status: 409,
        message: "isPrimary already exist"
      });
    }else{
      const newCustomer = new customerModal({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        isPrimary:req.body.isPrimary,
        projectId: req.body.projectId
      });
      const saveCustomer = await newCustomer.save();
      // res.status(200).json(saveCustomer);
      res.send({
        status: 200,
        saveCustomer
      });
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
};

//update category
exports.updateCustomer = async (req, res) => {
 
  // let isPrimaryExist = await customerModal.findOne({ isPrimary: req.body.isPrimary })
  //   if (isPrimaryExist !==null && Object.keys(isPrimaryExist) !== 0) {
  //     res.status(200).json({
  //       data:isPrimaryExist,
  //       status: 409,
  //       message: "isPrimary already exist"
  //     });
  //   }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    customerModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: 404,
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
                });
            } else res.send({ status: 200, message: "Customer was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Error updating Customer with id=" + id
            });
        });
};

//update isprimary customer
exports.updatePrimaryCustomer = async (req, res) => {
  let isPrimaryExist = await customerModal.findOne({ isPrimary: req.body.isPrimary })
  if (isPrimaryExist !==null && Object.keys(isPrimaryExist) !== 0) {
    res.status(200).json({
      status: 409,
      message: "isPrimary already exist"
    });
  }
  const id = isPrimaryExist._id;
  console.log("idddd",id)
  customerModal.findByIdAndUpdate(id, {isPrimary:false}, { useFindAndModify: false })
      .then(data => {
          if (!data) {
              res.status(404).send({
                  status: 404,
                  message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
              });
          } else res.send({ status: 200, message: "Customer was updated successfully." });
      })
      .catch(err => {
          res.status(500).send({
              status: 500,
              message: "Error updating Customer with id=" + id
          });
      });
};

// delete pricelist
exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  customerModal.findByIdAndRemove(id)
      .then(data => {
          if (!data) {
              res.status(404).send({
                  status: 404,
                  message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
              });
          } else {
              res.send({
                  status: 200,
                  message: "Customer was deleted successfully!"
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

//Get all cateogry
exports.getAllCustomer = async (req, res) => {
  try {
    await customerModal.find().then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


//Get customer by project id
exports.getCustomerByProjectId = async (req, res) => {
    const projectId = req.params.id;
    console.log("projectId",projectId)
    try {
      await customerModal.find({projectId:projectId}).then((data) => {
          debugger
        if (data) {
          res.send(data);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

//Get primary customer by project id
exports.getCustomerByIsPrimary = async (req, res) => {
  try {
    await customerModal.findOne({isPrimary:true}).then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};