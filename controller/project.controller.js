
const projectModal = require("../models/Project");

//Create new project
exports.createProject = async (req, res) => {
  try {
    const newProject = new projectModal({
      name: req.body.name,
      description: req.body.description,
      projectDescription: req.body.projectDescription,
      statusId: req.body.statusId,
      categoryIds:req.body.categoryIds,
      roofSize:req.body.roofSize,
      vat:req.body.vat,
      stateOfRoof:req.body.stateOfRoof,
      currentRoof:req.body.currentRoof,
      generateDescription:req.body.generateDescription ,
      generateLastDescription:req.body.generateLastDescription
    }
    );

    newProject.save(newProject)
      .then(data => {
        res.send({
          status: 200,
          data
        });
      })
      .catch(err => {
        res.status(500).send({
          status: 500,
          message: err.message || "Some error occurred while creating the project."
        });
      });

  } catch (err) {
    res.status(500).json(err)
  }
};

//Get all project
exports.getAllProject = async (req, res) => {
  try {

    await projectModal.find().then(data => {
      if (data) {
        res.status(200).send(data);
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
};

//update compnay
exports.updateProject = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  projectModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot update Compnay with id=${id}. Maybe Compnay was not found!`
        });
      } else res.send({ status: 200, message: "Project was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Error updating Compnay with id=" + id
      });
    });
};

//delete project
exports.deleteProject = (req, res) => {
  const id = req.params.id;
  projectModal.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot delete project with id=${id}. Maybe project was not found!`
        });
      } else {
        res.send({
          status: 200,
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Could not delete project with id=" + id
      });
    });
};

//get project by id
exports.getProjectById = (req, res) => {
  const id = req.params.id;
  projectModal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found Project with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          status: 500,
          message: "Error retrieving Project with id=" + id
        });
    });
};

//delete all project
exports.deleteAllCompany = (req, res) => {
  projectModal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Project were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Project."
      });
    });
};


