const express = require("express");
const router = express.Router();
const { getAllProducts} = require("../controller/marketplaceInventoryController");

router.get("/", getAllProducts);


module.exports = router