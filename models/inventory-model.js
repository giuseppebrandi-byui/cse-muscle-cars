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

module.exports = {getMakes, getInventoryByMakeId, getNewestInventoryByYear, addMakeToDatabase}