// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by make view
router.get("/type/:makeId", invController.buildByMakeId);

module.exports = router;