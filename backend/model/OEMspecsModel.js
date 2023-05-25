const mongoose = require("mongoose");

const oemSpecsSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  maxSpeed: {
    type: Number,
    required: true,
  }
});

const OEMSpecsModel = mongoose.model("OEMSpecs", oemSpecsSchema);

module.exports = OEMSpecsModel;
