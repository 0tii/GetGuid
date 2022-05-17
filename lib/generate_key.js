/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/

/**
 * Generate a random API key string
 * @param {*} length character count
 * @returns random string with ``length`` characters
 */
export function randomString(length) {
    let validChars = '.-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ret = '';
    for (let i = 0; i < length; i++) {
        ret += validChars.charAt(randInt(0, validChars.length));
    }
    return ret;
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}