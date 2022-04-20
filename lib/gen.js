import { verifyGuid, addGuid } from "./verify.js";
import crypto from 'crypto';

export function generateGuid() {
    while (true) {
        let guid = generate();
        if (verifyGuid(guid)) {
            addGuid(guid);
            return guid;
        }
    }
}

export function displayGuid(guid) {
    //XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    return (guid.substring(0, 7) + '-' + guid.substring(8, 11) + '-' + guid.substring(12, 15) + '-' + guid.substring(16, 19) + '-' + guid.substring(20, 31));
}

function generate() {
    return generateV4();
};

function generateV4() {
    let bytes = new Uint8Array(16);

    bytes = crypto.webcrypto.getRandomValues(bytes);
    let hex = Buffer.from(bytes).toString('hex');

    return replaceAt(hex, 12, '4');
}

function replaceAt(str, idx, rplc) {
    return str.substring(0, idx) + rplc + str.substring(idx + rplc.length);
}