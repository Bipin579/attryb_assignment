const express = require("express");
const router = express.Router();
const { postOEMspecs, getAllOEMspecs } = require("../controller/OEMspecsController");
const isAuthenticated = require("../middleware/authenticate");

router.post("/post-specs", isAuthenticated, postOEMspecs);
router.get("/get-specs", isAuthenticated, getAllOEMspecs);


module.exports = router;