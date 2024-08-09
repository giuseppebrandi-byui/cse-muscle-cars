// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");

// Route to build inventory by make view
router.get("/type/:makeId", invController.buildByMakeId);
// Route to build vehicle details view
router.get("/detail/:carModelId", invVehicle.buildSingleVehicle);

module.exports = router;