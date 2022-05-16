import util from 'util';
import pool from '../Model/Database.js'
/**
 * Error codes:
 * -  (0) [Unauthorized, invalid key provided]
 * - (-1) [No auth header / no key provided]
 * - (-2) [SQL error authorizing the provided key]
 * @param {*} req the request
 * @returns 1 if success or error code
 */
export async function verifyApiKey(req) {
    const conn = pool.promise();
    var key = req.get('API-Key');

    if (!key)
        return -1;
    try {
        let result = await conn.query('SELECT api_key FROM api_keys WHERE api_key = ?', [key]);
        console.log(result[0]);
        if(result && result[0].length != 0)
            return 1; //unauthorized
        else
            return 0; //authorized

    } catch (err) {
        console.log(err);
        return -2; //sql error
    }
}