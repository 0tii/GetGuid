import { verifyGuid, addGuid } from "./verify.js";
import crypto from 'crypto';

/**
 * Generate a V4 UUID
 */
export function generateGuid() {
    while (true) {
        let guid = generate();
        if (verifyGuid(guid)) {
            addGuid(guid);
            return guid;
        }
    }
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