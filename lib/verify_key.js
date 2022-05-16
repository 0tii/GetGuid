/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import util from 'util';
import pool from '../Model/database.js'
/**
 * Error codes:
 * -  (0) [Unauthorized, invalid key provided]
 * - (-1) [No auth header / no key provided]
 * - (-2) [SQL error authorizing the provided key]
 * - (-3) [Key expired]
 * @param {*} req the request
 * @returns 1 if success or error code
 */
export async function verifyApiKey(req) {
    const conn = pool.promise();
    var key = req.get('API-Key');

    if (!key)
        return -1;
    try {
        let result = await conn.query('SELECT api_key, valid_until FROM api_keys WHERE api_key = ?', [key]);
        if (result && result[0].length != 0) {
            if (isExpired(result[0][0].valid_until))
                return -3; //key expired
            else
                return 1; //authorized
        }
        else
            return 0; //unauthorized

    } catch (err) {
        console.log(err);
        return -2; //sql error
    }
}

function isExpired(timestamp) { return (new Date(timestamp) < new Date()); }