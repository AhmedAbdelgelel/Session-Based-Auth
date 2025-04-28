const express = require("express");
const { login, testAuth, logout } = require("../controller/authController");

const router = express();

router.post("/login", login);
router.get("/test", testAuth);
router.get("/logout", logout);

module.exports = router;
