const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {}

/*  **********************************
 *  Add inventory rules
 * ********************************* */
validate.addInventoryRules = () => {
  return [
    body("make_id")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Please select a valid car make"),
    // make name is required.
    body("inv_make")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("A valid make name is required")
      .custom(async (inv_make) => {
        if (!inv_make.match(/^[a-zA-Z]+$/)) {
          throw new Error("Only alphabethical characters allowed.");
        }
      }),
    
    // model name is required.
    body("inv_model")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("A valid model name is required"),
    
    // a description is required.
    body("inv_description")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2 })
      .withMessage("A description of the vehicle is required"),
    
    // an image path is required.
    body("inv_image")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Please provide a link to the vehicle image"),
    
    // an image thumbnail path is required.
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Please provide a link to the vehicle image thumbnail"),
    
    // vehicle's price is required.
    body("inv_price")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 4 })
      .withMessage("Please provide a valid price")
      .custom(async (inv_price) => {
         if (!inv_price.match(/^\d+$/)) {
          throw new Error("Only digits allowed.");
        }
      }),
    
    // vehicle's year is required.
    body("inv_year")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 4, max:4 })
      .withMessage("Please provide 4 digits year.")
      .custom(async (inv_year) => {
         if (!inv_year.match(/^\d+$/)) {
          throw new Error("Please provide 4 digits year.");
        }
      }),
    
    // vehicle's mileage is required.
    body("inv_miles")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Please provide a valid vehicle's mileage.")
      .custom(async (inv_miles) => {
         if (!inv_miles.match(/^\d+$/)) {
          throw new Error("Please provide a numeric value.");
        }
      }),
    
     // color is required.
    body("inv_color")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("A valid color is required")
      .custom(async (inv_color) => {
        if (!inv_color.match(/^[a-zA-Z]+$/)) {
          throw new Error("Only alphabethical characters allowed.");
        }
      }),
  ]
};



/*  **********************************
 *  Check add new vehicle data
 * ********************************* */
validate.checkNewInventoryData = async (req, res, next) => { 
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
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) { 
    let nav = await utilities.getNav();
    const selectMenu = await utilities.buildMakeList();
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      selectMenu,
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
    });
    return;
  }
  next();
}


/*  **********************************
 *  Check edit vehicle data
 * ********************************* */
validate.checkUpdateInventoryData = async (req, res, next) => { 
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
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors);
    let nav = await utilities.getNav();
    const selectMenu = await utilities.buildMakeList();
    res.render("./inventory/edit-inventory", {
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
  })
    return;
  }
  next();
}

module.exports = validate;

