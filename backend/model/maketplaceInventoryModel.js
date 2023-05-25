const mongoose = require("mongoose");

const marketplaceInventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DealerInventory",
    required: true,
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
    required: true,
  },
  oemSpecId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OEMSpecs",
    required: true,
  },
  kmsOnOdometer: {
    type: Number,
    required: true,
  },
  majorScratches: {
    type: Boolean,
    default: false,
  },
  originalPaint: {
    type: Boolean,
    default: true,
  },
  accidentsReported: {
    type: Number,
    default: 0,
  },
  previousBuyers: {
    type: Number,
    default: 0,
  },
  registrationPlace: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("MarketplaceInventory", marketplaceInventorySchema);
