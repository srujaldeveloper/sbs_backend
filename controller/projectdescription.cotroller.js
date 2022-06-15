const projectDescriptionModal = require("../models/ProjectDescription");

//Create new category
exports.createProjectDescription = async (req, res) => {
  try {
    const newProjectDescription = new projectDescriptionModal({
      description: req.body.description,
      projectId: req.body.projectId,
    });
    const saveDescription = await newProjectDescription.save();

    res.send(saveDescription);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get cateogry by id
exports.getProjectDescriptionById = async (req, res) => {
  const id = req.params.id;
  try {
    await projectDescriptionModal.find({ projectId: id }).then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all status
exports.getAllProjectDescription = async (req, res) => {
  try {

    await projectDescriptionModal.find().then(data => {
      if (data) {
        res.status(200).send(data);
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};