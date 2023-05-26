const mongoose = require("mongoose");

const DealerInventorySchema = new mongoose.Schema({
    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    oemSpecId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OEMSpecs",
        required: true,
    },
    imageUrl: {
        type: String,
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
    publish: {
        type: Boolean,
        default: false,  
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("DealerInventory", DealerInventorySchema);
