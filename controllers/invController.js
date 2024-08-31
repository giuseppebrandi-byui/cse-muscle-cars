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
  // const selectMenu = await utilities.buildMakeList();
  res.render("inventory/management", {
    title: "Management View",
    nav,
    // selectMenu,
    errors: null,
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
*  Deliver add make view
* *************************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  // const selectMenu = await utilities.buildMakeList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    // selectMenu,
    errors: null,
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

module.exports = invCont;