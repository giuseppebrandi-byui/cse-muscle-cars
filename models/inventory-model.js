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
  }
}

module.exports = {getMakes, getInventoryByMakeId}