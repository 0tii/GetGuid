/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import mysql from "mysql2";
import cfg from '../cfg/config.js';


const pool = mysql.createPool({
    host: cfg.dbHost,
    user: cfg.dbUser,
    port: cfg.dbPort,
    database: 'getguid',
    waitForConnections: true
});

/**
 * Promise based pool instance
 */
const asyncPool = pool.promise();

export default pool;