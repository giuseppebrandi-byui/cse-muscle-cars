// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");
const validate = require("../utilities/addmake-validation");
const addInvValidation = require("../utilities/addinventory-validation");
const selectController = require("../controllers/selectController");
const utilities = require("../utilities");

// Route to build inventory by make view
router.get("/type/:makeId", utilities.handleErrors(invController.buildByMakeId));
// Route to build vehicle details view
router.get("/detail/:carModelId", utilities.handleErrors(invVehicle.buildSingleVehicle));

// Deliver management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Deliver add make view
router.get("/add-make", utilities.handleErrors(invController.buildAddMakeView));

// Adding new make process
router.post(
  "/add-make",
  validate.makeRules(),
  validate.checkMakeData,
  utilities.handleErrors(invController.addMakeToDatabase));

// Deliver add inventory view
router.get("/add-inventory", utilities.handleErrors(selectController.buildDropDown));

// Adding new vehicle process
router.post(
  "/add-inventory",
  addInvValidation.addInventoryRules(),
  addInvValidation.checkNewInventoryData,
  utilities.handleErrors(selectController.insertInventory));

// Deliver inventory view depending on make selection 
router.get("/getInventory/:make_id", utilities.handleErrors(invController.getInventoryJSON));

// Deliver edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));

// Edit vehicle process
router.post(
  "/update",
  addInvValidation.addInventoryRules(),
  addInvValidation.checkUpdateInventoryData,
  utilities.handleErrors(selectController.editInventory));

// Deliver edit inventory view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView));

// Delete vehicle process
router.post(
  "/delete",
  utilities.handleErrors(selectController.deleteInventory));

module.exports = router;