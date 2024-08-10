const utilities = require("../utilities/")
const invModel = require("../models/inventory-model");
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav();
  const data = await invModel.getNewestInventoryByYear('2024');
  const grid = await utilities.buildNewestCarsGrid(data);
  res.render("index", {title: "Home", nav, grid})
}

module.exports = baseController