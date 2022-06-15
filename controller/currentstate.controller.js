
const stateModal = require("../models/CurrentState");

//Create new State
exports.createState = async (req, res) => {
  try {
    const newState = new stateModal({
      name: req.body.name,
   
    });
    const saveState = await newState.save();

    res.status(200).json(saveState);

  } catch (err) {
    res.status(500).json(err)
  }
};


//Get all state
exports.getAllState = async (req, res) => {
  try {

    await stateModal.find().then(data => {
      if (data) {
        res.status(200).send({status:200, data: data });
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};



