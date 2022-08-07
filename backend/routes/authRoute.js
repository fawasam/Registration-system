const express = require("express");
const router = express.Router();

// Load Controllers
const {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");

const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

router.post("/register", validSign, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, signinController);
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/forgotpassword", resetPasswordValidator, resetPasswordController);

module.exports = router;
