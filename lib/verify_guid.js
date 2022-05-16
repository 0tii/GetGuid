/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import util from 'util';
import cfg from '../cfg/config.js';

/**
 * Test whether a given GUID has a collision
 * - Uses a MySQL transaction to avoid edge cases
 * @param {*} guid 
 */
export async function verifyGuid(guid, connection) {
    try {
        await util.promisify(connection.beginTransaction).bind(connection)();

        let result = await util.promisify(connection.query).bind(connection)(`SELECT * FROM guids WHERE unique_id = '${guid}'`);
        let collision = (result && result.length != 0);

        if (collision) {
            await util.promisify(connection.rollback).bind(connection)();
        } else {
            await util.promisify(connection.query).bind(connection)(`INSERT INTO guids (unique_id) VALUES ('${guid}')`);
            await util.promisify(connection.commit).bind(connection)();
        }

        return !collision; //return whether there is *no* collision
    }catch(err){
        console.log("Error verifying guid.");
        if(cfg.advancedDebug) console.log(err);
        return false;
    }
};