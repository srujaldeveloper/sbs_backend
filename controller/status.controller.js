
const statusModal = require("../models/Status");

//Create new status
exports.createStatus = async (req, res) => {
  try {
    const newStatus = new statusModal({
      name: req.body.name,
   
    });
    const saveStatus = await newStatus.save();

    res.status(200).json(saveStatus);

  } catch (err) {
    res.status(500).json(err)
  }
};

//Get all status
exports.getAllStatus = async (req, res) => {
  try {

    await statusModal.find().then(data => {
      if (data) {
        res.status(200).send(data);
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};

//get status by id
exports.getStatusById = (req, res) => {
  const id = req.params.id;
  statusModal.findById(id)
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
