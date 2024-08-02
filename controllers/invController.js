const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by maker view
 * ************************** */
invCont.buildByMakeId = async function (req, res, next) {
  const make_id = req.params.makeId;
  const data = await invModel.getInventoryByMakeId(make_id);
  const grid = await utilities.buildMakeGrid(data);
  let nav = await utilities.getNav();
  const makeName = data[0].make_name;
  res.render("./inventory/make", {
    title: makeName + " vehicles",
    nav,
    grid,
  })
} 

module.exports = invCont;