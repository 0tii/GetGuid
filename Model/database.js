import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'getguid',
    waitForConnections: true
});

const connection = pool.promise();

export default connection;