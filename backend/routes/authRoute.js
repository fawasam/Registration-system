const express = require("express");
const router = express.Router();

// Load Controllers
const {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  //   googleController,
  //   facebookController,
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
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

// // forgot reset password

// // Google and Facebook Login
// router.post("/googlelogin", googleController);
// router.post("/facebooklogin", facebookController);
module.exports = router;
