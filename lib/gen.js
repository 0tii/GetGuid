/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import { verifyGuid } from "./verify.js";
import crypto from 'crypto';
import pool from '../Model/database.js';
import util from 'util';
import cfg from '../cfg/config.js';

export function genError(code, msg) {
    return {
        "code": code,
        "error": msg
    }
}

/**
 * Generate a V4 UUID
 */
export async function generateGuid() {

    const connection = await util.promisify(pool.getConnection).bind(pool)();

    for (let i = 0; i < cfg.maxConsecutiveCollisions; i++) {
        let guid = generate();
        let guidGood = await verifyGuid(guid, connection);
        if (guidGood) {
            await connection.release(); //no callback - no wrap
            return guid;
        }
    }
    await connection.release();
    console.log(`Reached ${cfg.maxConsecutiveCollisions} consecutive collisions, aborting. Something is going wrong.`);
    return '-1';
}

/**
 * Generate a V4 UUID
 */
export async function generateGuidObject() {
    return wrapGuid(await generateGuid());
}

/**
 * wrap a guid in a simple json object
 * @param {*} guid 
 */
export function wrapGuid(guid) {
    let json = {
        "guid": guid
    };
    return json;
}

function displayGuid(guid) {
    return (guid.substring(0, 8) + '-' + guid.substring(8, 12) + '-' + guid.substring(12, 16) + '-' + guid.substring(16, 20) + '-' + guid.substring(20, 31));
}

function generate() {
    return generateV4();
}

function generateV4() {
    let bytes = new Uint8Array(16);

    bytes = crypto.webcrypto.getRandomValues(bytes);
    let hex = Buffer.from(bytes).toString('hex');

    return displayGuid(replaceAt(hex, 12, '4'));
}

function replaceAt(str, idx, rplc) {
    return str.substring(0, idx) + rplc + str.substring(idx + rplc.length);
}