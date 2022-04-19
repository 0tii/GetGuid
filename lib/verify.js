import connection from '../Model/database.js';

/**
 * Test whether a given GUID has a collision
 * @param {*} guid 
 * @returns 
 */
export async function verifyGuid(guid) {
    let [rows, fields] = await connection.query(
        `SELECT * FROM guids WHERE unique_id = '${guid}'`
    );
    return (rows && rows.length == 0);
};

export async function addGuid(guid) {
    await connection.query(
        `INSERT INTO guids (unique_id) VALUES ('${guid}')`
    );
};