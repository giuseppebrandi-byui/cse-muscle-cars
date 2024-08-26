// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");
const utilities = require("../utilities");

// Route to build inventory by make view
router.get("/type/:makeId", utilities.handleErrors(invController.buildByMakeId));
// Route to build vehicle details view
router.get("/detail/:carModelId", utilities.handleErrors(invVehicle.buildSingleVehicle));

// Deliver management view
router.get("/management", utilities.handleErrors(invController.buildManagementView));

// Deliver add make view
router.get("/add-make", utilities.handleErrors(invController.buildAddMakeView));

// Adding new make process
router.post(
  "/add-make",
  utilities.handleErrors(invController.addMakeToDatabase));

module.exports = router;