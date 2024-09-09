const jwt = require("jsonwebtoken");
require("dotenv").config();
const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getMakes();
  let list = "<ul class='nav__list'>";
  list += '<li><a href="/" class="nav__link" title="Home page">Home</a></li>';
  list += '<li><a href="#" class="nav__link" title="About page">About</a></li>';
  list += '<li class="dropdown__item">';
  list += '<div class="nav__link">Vehicles <i class="ri-arrow-down-s-line dropdown__arrow"></i></div>';
  list += '<ul class="dropdown__menu">';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a class="dropdown__link" href="/inv/type/' +
      row.make_id +
      '" title="See our inventory of ' +
      row.make_name +
    ' vehicles">' +
      '<i class="ri-car-line"></i> ' +
      row.make_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  list += '<li><a href="#" class="nav__link" title="Services page">Services</a></li>';
  list += '<li><a href="#" class="nav__link" title="Contact page">Contact</a></li>';
  list += '<li><a href="/account/login" class="nav__link" title="Click to log in">My Account</a></li>';
  list += '</ul>';
  return list;
}

/* **************************************
* Build the make view HTML
* ************************************ */
Util.buildMakeGrid = async function(data){
  let grid;
  if (data.length > 0) {
    grid = '<ul class="grid grid--1-cols grid--2-cols grid--3-cols">';
    data.forEach(vehicle => { 
      grid += '<li class="scrollbar-item">';
      grid += '<div class="new-cars-card">';
      grid += '<figure class="card-banner img-holder" style="--width: 650; --height: 433;">';
      grid += '<img src="' + vehicle.inv_thumbnail + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Muscle Cars" width="650" height="433" loading="lazy" class="img-cover">';
      grid += '</figure>';
      grid += '<div class="card-content">';
      grid += '<p class="card-subtitle">' + vehicle.inv_make + '</p>';
      grid += '<h3 class="h3 card-title">' + vehicle.inv_model + '</h3>';
      grid += '<div class="info-vehicle">';
      grid += '<p>Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>';
      grid += '<p>Year: ' + vehicle.inv_year + '</p>';
      grid += '</div>';
      grid += '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details" class="card-btn">';
      grid += '<span class="material-symbols-rounded">arrow_forward</span>';
      grid += ' </a>';
      grid += '</div>';
      grid += '</div>';
      grid += '</li>';
    })
    grid += '</ul>';
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid;
}


/* *******************************************
* Build the Newest Cars view HTML in the Home page
* ************************************ */
Util.buildNewestCarsGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul class="has-scrollbar">';
    data.forEach(vehicle => { 
      grid += '<li class="scrollbar-item">';
      grid += '<div class="new-cars-card">';
      grid += '<figure class="card-banner img-holder" style="--width: 650; --height: 433;">';
      grid += '<img src="' + vehicle.inv_thumbnail + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Muscle Cars" width="650" height="433" loading="lazy" class="img-cover">';
      grid += '</figure>';
      grid += '<div class="card-content">';
      grid += '<p class="card-subtitle">' + vehicle.inv_make + '</p>';
      grid += '<h3 class="h3 card-title">' + vehicle.inv_model + '</h3>';
      grid += '<div class="info-vehicle">';
      grid += '<p>Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>';
      grid += '<p>Year: ' + vehicle.inv_year + '</p>';
      grid += ' </div>';
      grid += '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details" class="card-btn">';
      grid += '<span class="material-symbols-rounded">arrow_forward</span>';
      grid += '</a>';
      grid += '</div>';
      grid += '</div>';
      grid += '</li>'
    })
    grid += '</ul>';
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid;
}

/* **************************************
 * Build the chosen vehicle view HTML
 * ************************************ */
Util.buildSingleVehiclePage = async function (vehicle, locals = null) {
  let carDetailsGrid;
  carDetailsGrid = '<h1 class="vehicle-title card-title">';
  carDetailsGrid += vehicle.inv_make + " " + vehicle.inv_model;
  carDetailsGrid += '</h1>';
  carDetailsGrid += '<div class="grid grid--2-cols grid--1-cols">'; // Open grid section

  carDetailsGrid += '<figure>';
  carDetailsGrid += '<img class="vehicle-img" src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + " " + vehicle.inv_model + ' on CSE Muscle Cars" />'; // Image section
  carDetailsGrid += '</figure>';

  carDetailsGrid += '<div>'; // Info section
  carDetailsGrid += '<p class="info-text">';
  carDetailsGrid += '<span class="label">Price:</span> ' + "$" + new Intl.NumberFormat("en-US").format(vehicle.inv_price);
  carDetailsGrid += '</p>';

  carDetailsGrid += '<div>'; // Open div more details section
  carDetailsGrid += '<p class="info-text">';
  carDetailsGrid += '<span class="label">Year:</span> ' + vehicle.inv_year;
  carDetailsGrid += '</p>';

  carDetailsGrid += '<p class="info-text">';
  carDetailsGrid += '<span class="label">Mileage:</span> ' + vehicle.inv_miles.toLocaleString();
  carDetailsGrid += '</p>';

  carDetailsGrid += '<p class="info-text">';
  carDetailsGrid += '<span class="label">Color:</span> ' + vehicle.inv_color;
  carDetailsGrid += "</p>";

  carDetailsGrid += '<p class="info-text">';
  carDetailsGrid += '<span class="label">Description:</span> ' + vehicle.inv_description;
  carDetailsGrid += "</p>";

  carDetailsGrid += "</div>"; // close div more details section

  carDetailsGrid += '</div>'; // Close info section
 
  carDetailsGrid += "</div>"; // close grid section

  return carDetailsGrid;
};

Util.buildMakeList = async function (make_id = null) {
    let data = await invModel.getMakes()
    let makeList =
      '<select name="make_id" id="makeList" required>'
    makeList += "<option value=''>Select Make</option>"
    data.rows.forEach((row) => {
      makeList += '<option value="' + row.make_id + '"'
      if (
        make_id != null &&
        row.make_id == make_id
      ) {
        makeList += " selected "
      }
      makeList += ">" + row.make_name + "</option>"
    })
    makeList += "</select>"
  return makeList;
  }


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
 if (req.cookies.jwt) {
  jwt.verify(
   req.cookies.jwt,
   process.env.ACCESS_TOKEN_SECRET,
   function (err, accountData) {
    if (err) {
     req.flash("Please log in")
     res.clearCookie("jwt")
     return res.redirect("/account/login")
    }
    res.locals.accountData = accountData
    res.locals.loggedin = 1
    next()
   })
 } else {
  next()
 }
}

module.exports = Util;