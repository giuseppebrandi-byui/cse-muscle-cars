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

      // grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      // + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      // + 'details"><img src="' + vehicle.inv_thumbnail 
      // +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      // +' on CSE Muscle Cars" /></a>'
      // grid += '<div class="namePrice">'
      // grid += '<hr />'
      // grid += '<h2>'
      // grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      // + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      // + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      // grid += '</h2>'
      // grid += '<span>$' 
      // + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      // grid += '</div>'
      // grid += '</li>'
    })
    grid += '</ul>';
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid;
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;