const projectLabelModal = require("../models/ProjectLabel");
const textCategoryModal = require("../models/TextCategory");

//Create new category
exports.createProjectLabel = async (req, res) => {
  try {
    const newProjectLabel = new projectLabelModal({
      textCategory: req.body.textCategory,
      title: req.body.title,
      text: req.body.text,
      sortOrder: req.body.sortOrder,
      category: req.body.category,
      sellerId: req.body.sellerId,
    });
    const savelabel = await newProjectLabel.save();

    res.send(savelabel);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all project label
exports.getProjectLabel = async (req, res) => {
  try {
    await projectLabelModal.find().then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {  
    res.status(500).json(err);
  }
};

exports.getProjectLabelById = async (req, res) => {
  await textCategoryModal.find({name:req.query.key}).then(async textData=>{
    const labelId = String(textData[0]._id) ;
    await projectLabelModal
      .aggregate([{ $match: { textCategory: labelId } },{ $sort: { sortOrder: 1 } }])
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  })
 
};

//update project label
exports.updateProjectModel = async (req, res) => {
  const id = req.params.id;
  console.log("idddddddddd", id, req.body);
  try {
    await projectLabelModal
      .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (data) {
          res.send(data);
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete project label
exports.deleteProjectLabel = async (req, res) => {
  const id = req.params.id;
  try {
    await projectLabelModal.findByIdAndDelete(id).then((data) => {
      if (data) {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
