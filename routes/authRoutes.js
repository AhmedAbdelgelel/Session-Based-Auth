const express = require("express");
const {
  login,
  testAuth,
  logout,
  register,
} = require("../controller/authController");

const router = express();
router.post("/register", register);
router.post("/login", login);
router.get("/test", testAuth);
router.get("/logout", logout);

module.exports = router;
