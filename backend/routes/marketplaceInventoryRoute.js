const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authenticate");
const { getAllProducts} = require("../controller/marketplaceInventoryController");

router.get("/", isAuthenticated, getAllProducts);


module.exports = router;