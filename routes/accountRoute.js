const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const accountModel = require("../models/account-model");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

// Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Deliver register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount));

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send("login process");
  }
);

// TO FIX
// router.post(
//   "/login",
//   regValidate.loginRules(),
//   regValidate.checkLoginData,
//   utilities.handleErrors(accountModel.checkExistingEmail)
// );

module.exports = router;
