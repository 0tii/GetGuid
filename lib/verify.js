import connection from '../Model/database.js';

exports.verifyGuid = (guid) => {
    connection.query(
        `SELECT * FROM guids WHERE unique_id = ${guid}`,
        (err, results, fields) => {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
};

exports.addGuid = (guid) => {
    connection.query(
        `INSERT INTO guids (unique_id) VALUES (${guid})`,
        (err, results, fields) => {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
};