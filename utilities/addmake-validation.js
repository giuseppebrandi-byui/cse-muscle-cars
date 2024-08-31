const invModel = require("../models/inventory-model");
const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {}

/*  **********************************
 *  Make rules
 * ********************************* */
validate.makeRules = () => {
  return [
    // valid make is required and cannot already exist in the database
    body("make_name")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2 })
      .withMessage("A valid make name is required")
      .custom(async (make_name) => {
        if (!make_name.match(/^\S+$/)) {
          throw new Error("No white space is allowed.");
        }
        if (!make_name.match(/^[a-zA-Z]+$/)) {
          throw new Error("Only alphabethical characters allowed.");
        }
      })
      .custom(async (make_name) => {
        const makeName = await invModel.checkExistingMakeName(make_name);
        if (makeName) {
          throw new Error("Make name already exists.");
        }
      })
  ]
};

/*  **********************************
 *  Check add make data
 * ********************************* */
validate.checkMakeData = async (req, res, next) => { 
  const { make_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) { 
    let nav = await utilities.getNav();
    res.render("inventory/add-make", {
      errors,
      title: "Add New Make",
      nav,
      make_name,
      messagesAddMake: null,
    });
    return;
  }
  next();
}

module.exports = validate;

