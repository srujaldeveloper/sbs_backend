const PriceListCategoryModal = require("../models/PriceListCategory");

//Create new category
exports.createPriceListCategory = async (req, res) => {
  try {
    const newPriceListCategory = new PriceListCategoryModal({
      priceListId: req.body.priceListId,
      categoryId: req.body.categoryId,
    });
    const saveCategory = await newPriceListCategory.save();

    res.status(200).json(saveCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get pricelist category by id
exports.getPriceListCategoryById = (req, res) => {
  const id = req.params.id;
  PriceListCategoryModal
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: 404,
          message: "Not found Seller with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving Seller with id=" + id,
      });
    });
};
