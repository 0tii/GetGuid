import mysql from "mysql2";

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'getguid',
    waitForConnections: true
});

/**
 * A dynamic connection from a MySQL connection pool
 */
const connection = conn.promise();

export default connection;