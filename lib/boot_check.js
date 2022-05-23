/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import pool from '../Model/database.js';
import fs from 'fs';

export async function bootCheck() {

    let cfg, templateCfg;

    try {
        cfg = await import('../cfg/config.js');
    } catch (err) {
        console.error("Could not find config.js in /cfg.");
        process.exit(1);
    }
    console.log("Found config.js");

    try {
        templateCfg = await import ('../cfg/_config.js');
    } catch (err) {
        console.error("Could not find _config.js in /cfg.");
        process.exit(1);
    }
    console.log("Found _config.js");

    //check cfg
    if (!checkCfg(cfg, templateCfg)) {
        console.error("Config mismatch. Make sure your config matches the options of _config.");
        process.exit(1);
    }
    console.log("Config is valid.");

    console.log("[Info] CORS enabled? <"+cfg.default.allowCors+">");

    //check db
    try {
        let p = pool.promise();
        await p.query('Select * from api_keys');
    } catch (err) {
        console.error("Could not make sample query to MySQL database.");
        if (cfg.default.advancedDebug) console.log(err);
        process.exit(1);
    }
    console.log("Database connection good.");

    //check for certificates
    if (cfg.default.useSSL) {
        let warn = false;

        if (!cfg.default.certName) {
            console.warn("SSL is enabled but certificate file name has not been specified in config.js");
            warn = true;
        }

        if (!cfg.default.privKeyName) {
            console.warn("SSL is enabled but private key file name has not been specified in config.js");
            warn = true;
        }

        try {
            fs.readFileSync('../sslcert/'+cfg.default.certName);
        } catch {
            console.warn("SSL is enabled but private key can not be found in /sslcert/"+cfg.default.certName);
            warn = true;
        }

        try {
            fs.readFileSync('../sslcert/'+cfg.default.privKeyName);
        } catch {
            console.warn("SSL is enabled but private key can not be found in /sslcert/"+cfg.default.privKeyName);
            warn = true;
        }

        if (warn)
            console.warn("One or more certificate files are missing or unspecified. You can ignore this if you secured your traffic by other means such as VirtualHost Proxy.");
    }
}

function checkCfg(cfg, templateCfg) {
    let c1 = Object.keys(cfg).sort();
    let c2 = Object.keys(templateCfg).sort();
    return JSON.stringify(c1) === JSON.stringify(c2);
}