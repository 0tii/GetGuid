/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import cfg from "../cfg/config.js";
import templateCfg from "../cfg/_config.js";
import pool from '../Model/database.js';

export async function bootCheck() {
    //check cfg
    if (!checkCfg()) {
        console.log("Config mismatch. Make sure your config has all the latest options from the default _config.js");
        process.exit(1);
    }
    console.log("Config good.");

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
}

function checkCfg() {
    let c1 = Object.keys(cfg).sort();
    let c2 = Object.keys(templateCfg).sort();
    return JSON.stringify(c1) === JSON.stringify(c2);
}