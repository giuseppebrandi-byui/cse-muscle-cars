const invModel = require("../models/inventory-model");
const vehicleModel = require("../models/vehicle-model");
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
      errors: null,
      grid,
    })
  } catch (err) { 
    next({ status: 401, message: 'Sorry, the make you are looking for does not exist.' });
  }
} 

/* ****************************************
*  Deliver management view
* *************************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const selectMenu = await utilities.buildMakeList();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    selectMenu,
  });
}

/* ****************************************
*  Deliver add make view
* *************************************** */
invCont.buildAddMakeView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-make", {
    title: "Add Make",
    nav,
    errors: null,
    messagesAddMake: null,
  });
}

/* ****************************************
*  Deliver inventory view
* *************************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const selectMenu = await utilities.buildMakeList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    errors: null,
    selectMenu,
  });
}


/* ****************************************
*  Add Make Process
* *************************************** */
invCont.addMakeToDatabase = async function (req, res) {
  let nav = await utilities.getNav();
  const { make_name } = req.body;
  try {
    const addResult = await invModel.addMakeToDatabase(make_name);
  } catch (error) {
    throw new Error(error, "Something went wrong with the database add operation");
  }
  res.render("inventory/add-make", {
    title: "Add Make",
    nav,
    errors: null,
    messagesAddMake: `Congratulations, you have added ${make_name} to the database.`
  })
}


/* ***************************
 *  Return Inventory by Make As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const make_id = parseInt(req.params.make_id)
  const invData = await invModel.getInventoryByMakeId(make_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await vehicleModel.getVehicleById(inv_id)
  const selectMenu = await utilities.buildMakeList(itemData.make_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    selectMenu: selectMenu,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    make_id: itemData.make_id
  })
}

module.exports = invCont;