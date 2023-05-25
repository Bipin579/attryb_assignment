const maketplaceInventoryModel = require("../model/maketplaceInventoryModel");

const getAllProducts = async (req, res) => {
  try {
    const cars = await maketplaceInventoryModel.find().populate("oemSpecId");
    res.status(201).json({ cars, success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = { getAllProducts };
