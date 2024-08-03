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
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Muscle Cars" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
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