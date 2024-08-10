const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by make view
 * ************************** */
invCont.buildByMakeId = async function (req, res, next) {
  try {
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
  } catch (err) { 
    next({ status: 401, message: 'Sorry, the make you are looking for does not exist.' });
  }
} 

module.exports = invCont;