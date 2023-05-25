const express = require("express");
const router = express.Router();
const { getDealerInventory, postCar, publicCar, editCar, deleteItems } = require("../controller/dealerController");
const isAuthenticated = require("../middleware/authenticate");

router.post("/postcar", isAuthenticated, postCar);
router.get("/getInventory", isAuthenticated, getDealerInventory);
router.patch("/publicCar/:id", isAuthenticated, publicCar);
router.patch("/editCar/:id", isAuthenticated, editCar)
router.delete("/delete", isAuthenticated, deleteItems)


module.exports = router;