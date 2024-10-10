const pool = require("../database/")

/* ***************************
 *  Get all make data
 * ************************** */
async function getMakes(){
  return await pool.query("SELECT * FROM public.make ORDER BY make_name")
}

/* ***************************
 *  Get all inventory items and make_name by make_id
 * ************************** */
async function getInventoryByMakeId(make_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.make AS c 
      ON i.make_id = c.make_id 
      WHERE i.make_id = $1`,
      [make_id]
    )
    return data.rows
  } catch (error) {
    console.error("getmakesbyid error " + error)
    throw new Error(error)
  }
}

/* ***************************
 *  Insert new make into database
 * ************************** */
async function addMakeToDatabase(make_name) { 
  try {
    const data = await pool.query(
      `INSERT INTO public.make(make_name) VALUES ($1) RETURNING *`,
      [make_name]
    )
    return data.rows
  } catch (error) { 
    console.error("getNewMake error " + error)
    throw new Error(error)
  }
}

/* ***************************
 *  Insert new vehicle into database
 * ************************** */
async function addNewInventoryToDatabase(
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
) { 
  try {
    const data = await pool.query(
      `INSERT INTO public.inventory(
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        make_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, make_id]
    )
    return data.rows
  } catch (error) { 
    console.error("getNewAddedInventory error " + error)
    throw new Error(error)
  }
}

/* ***************************
 *  Edit vehicle into database
 * ************************** */
async function editInventoryToDatabase(
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
) { 
  try {
    const data = await pool.query(
      `UPDATE inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, make_id = $10 WHERE inv_id = $11 RETURNING *`,
      [inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, make_id, inv_id]
    )
    return data.rows
  } catch (error) { 
    console.error("geteditInventory error " + error)
    throw new Error(error)
  }
}


/* ***************************
 *  Get all inventory items and make_name by inv_year
 * ************************** */
async function getNewestInventoryByYear(inv_year) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      WHERE i.inv_year = $1;`,
      [inv_year]
    )
    return data.rows
  } catch (error) {
    console.error("getmakesbyyear error " + error)
    throw new Error(error)
  }
}

/* ****************************************
 *   Check for existing make name
 * ************************************* */
async function checkExistingMakeName(make_name) { 
  try {
    const sql = "SELECT * FROM make WHERE make_name = $1";
    const make = await pool.query(sql, [make_name]);
    return make.rowCount;
  } catch (error) { 
    return error.message;
  }
}


module.exports = {getMakes, getInventoryByMakeId, getNewestInventoryByYear, addMakeToDatabase, checkExistingMakeName, addNewInventoryToDatabase, editInventoryToDatabase}