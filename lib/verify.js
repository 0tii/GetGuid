import pool from '../Model/database.js';

/**
 * Test whether a given GUID has a collision
 * @param {*} guid 
 */
export async function verifyGuid(guid) {
    let [rows, fields] = await pool.query(
        `SELECT * FROM guids WHERE unique_id = '${guid}'`
    );
    return (rows && rows.length == 0);
};

/**
 * Add a collision-free guid to the db
 * @param {*} guid 
 */
export async function addGuid(guid) {
    await pool.query(
        `INSERT INTO guids (unique_id) VALUES ('${guid}')`
    );
};