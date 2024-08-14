const pool = require("../database/");

/* ***********************
 * Get single vehicle data
 * ********************* */
async function getVehicleById(inv_id) {
  try {
    let dataVehicle = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    );
    // console.log(dataVehicle.rows[0]);
    return dataVehicle.rows[0];
  } catch (error) { 
    console.error("getVehicleById error " + error);
    throw new Error(error)
  }
}

module.exports = { getVehicleById };
