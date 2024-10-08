const utilities = require("../utilities/");
const invModel = require("../models/inventory-model");

async function buildDropDown(req, res) { 
  const selectMenu = await utilities.buildMakeList();
  let nav = await utilities.getNav();
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    selectMenu,
    nav,
    errors: null,
  })
}

const insertInventory = async (req, res) => { 
  let nav = await utilities.getNav();
  const selectMenu = await utilities.buildMakeList();
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    make_id,
  } = req.body;
  const result = await invModel.addNewInventoryToDatabase(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    make_id
  );
  if (result) {
    req.flash(
      "notice",
      `Congratulations, you have added ${inv_make} ${inv_model} to the database.`
    );
    res.status(201).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      selectMenu,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the insertion failed.");
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      selectMenu,
      errors: null,
    });
  }
}

const editInventory = async (req, res) => { 
  let nav = await utilities.getNav();
  const selectMenu = await utilities.buildMakeList();
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    make_id,
    inv_id,
  } = req.body;
  
  const result = await invModel.editInventoryToDatabase(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    make_id,
    inv_id,
  );
  // All INFORMATION FROM INVCONTROLLER
  if (result) {
    req.flash(
      "notice",
      `Congratulations, you have edited ${inv_make} ${inv_model}.`
    );
    let nav = await utilities.getNav();
    const selectMenu = await utilities.buildMakeList();
    res.status(201).render("./inventory/edit-inventory", {
      title: "Edit " + inv_model,
      nav,
      selectMenu: selectMenu,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      make_id,
    });
  } else {
    req.flash("notice", "Sorry, the insertion failed.");
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      selectMenu,
      errors: null,
    });
  }
}


const deleteInventory = async (req, res) => { 
  let nav = await utilities.getNav();
  const {
    inv_id,
  } = req.body;
  console.log("Giuseppe", req.body, inv_id);
  try {
    console.log("That's where we are: ", req.body, inv_id);
  await invModel.deleteInventoryFromDatabase(
    inv_id,
  );
  // All INFORMATION FROM INVCONTROLLER
    req.flash(
      "notice",
      `Congratulations, you have deleted the selected car.`
    );
    let nav = await utilities.getNav();
    const selectMenu = await utilities.buildMakeList();
    res.status(201).render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    selectMenu,
  });
  } catch {
    req.flash("notice", "Sorry, the insertion failed.");
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      selectMenu,
      errors: null,
    });
  }
}


module.exports = { insertInventory, buildDropDown, editInventory, deleteInventory};