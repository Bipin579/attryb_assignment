const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controller/UserController");
const isAuthenticated = require("../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);

module.exports = router;