/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import pool from '../Model/database.js';

export async function bootCheck() {

    let cfg, templateCfg;

    try{
        cfg = await import('../cfg/config.js');
    }catch(err){
        console.log("Could not find config.js in /cfg.");
        process.exit(1);
    }
    console.log("Found config.js");

    try{
        templateCfg = await import('../cfg/_config.js');
    }catch(err){
        console.log("Could not find _config.js in /cfg.");
        process.exit(1);
    }
    console.log("Found _config.js");

    //check cfg
    if (!checkCfg(cfg, templateCfg)) {
        console.log("Config mismatch. Make sure your config matches the options of _config.");
        process.exit(1);
    }
    console.log("Config is valid.");

    //check db
    try{
        let p = pool.promise();
        await p.query('Select * from api_keys');
    }catch(err){
        console.log("Could not make sample query to MySQL database.");
        if(cfg.advancedDebug) console.log(err);
        process.exit(1);
    }
    console.log("Database connection good.");

    //check for certificates
    if(cfg.useSSl){

        if(!cfg.certName){
            console.log("SSL is enabled but certificate file name has not been specified in config.js");
            process.exit(1);
        }

        if(!cfg.privKeyName){
            console.log("SSL is enabled but private key file name has not been specified in config.js");
            process.exit(1);
        }

        try{
            await import(`../sslcert/${cfg.certName}`);
        }catch{
            console.log("SSL is enabled but certificate can not be found in /sslcert.");
            process.exit(1);
        }
        try{
            await import(`../sslcert/${cfg.privKeyName}`);
        }catch{
            console.log("SSL is enabled but private key can not be found in /sslcert.");
            process.exit(1);
        }

        console.log("SSL file configuration valid. This does not guarantee you set up your SSL correctly.");
    }
}

function checkCfg(cfg, templateCfg) {
    let c1 = Object.keys(cfg).sort();
    let c2 = Object.keys(templateCfg).sort();
    return JSON.stringify(c1) === JSON.stringify(c2);
}