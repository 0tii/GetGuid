import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'getguid',
    waitForConnections: true
});

/**
 * Promise based pool instance
 */
const asyncPool = pool.promise();

export default asyncPool;