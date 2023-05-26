const express = require("express");
const router = express.Router();
const { login, register, logout, getUser } = require("../controller/UserController");
const isAuthenticated = require("../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

module.exports = router;