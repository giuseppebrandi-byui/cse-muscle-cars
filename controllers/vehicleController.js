const vehicleModel = require("../models/vehicle-model");
const utilities = require("../utilities/");

const vehicleCont = {}

/* ***************************
 *  Build vehicle details
 * ************************** */
vehicleCont.buildSingleVehicle = async function (req, res, next) { 
  try {

    const inv_id = req.params.carModelId;
    const data = await vehicleModel.getVehicleById(inv_id);
    const carDetailsGrid = await utilities.buildSingleVehiclePage(data, res.locals.accountData);
    let nav = await utilities.getNav();
    res.render("inventory/vehicle", {
      title: "Your Car",
      nav,
      carDetailsGrid,
      error: null,
    });
  } catch (err) { 
    next({status: 402, message: 'Sorry, the vehicle you are looking for does not exist.'})
  }
}

module.exports = vehicleCont;