import pool from '../Model/database.js';

/**
 * Test whether a given GUID has a collision
 * @param {*} guid 
 */
export async function verifyGuid(guid) {

    let collision = true;

    guid = '00000000000000000000000000033000';

    pool.getConnection(function (err, conn) {
        conn.beginTransaction(function (err) {
            if (err) {
                console.log(err);
                conn.rollback(function () {
                    conn.release();
                });
            }
            else {
                conn.query(
                    `SELECT * FROM guids WHERE unique_id = '${guid}'`,
                    function (err, results) {
                        if (err) {
                            console.log(err);
                            conn.rollback(function () {
                                conn.release();
                            });
                        }
                        else {

                            console.log("Trying to verify guid. Collision: " + (results == []));
                            collision = (results != []);
                            if(!collision)
                                conn.commit(function (err) {
                                    if (err) {
                                        console.log(err);
                                        conn.rollback(function () {
                                            conn.release();
                                        });
                                    }
                                    else {
                                        conn.release();
                                    }
                                });
                            else
                                conn.query(`INSERT INTO guids (unique_id) VALUES ('${guid}')`, function (err) {
                                    if (err) {
                                        console.log(err);
                                        conn.rollback(function () {
                                            conn.release();
                                        });
                                    }
                                    else {
                                        conn.commit(function (err) {
                                            if (err) {
                                                console.log(err);
                                                conn.rollback(function () {
                                                    conn.release();
                                                });
                                            }
                                            else {
                                                conn.release();
                                            }
                                        });
                                    }
                                });
                        }
                    }
                );

            }
        });
    });

    return (collision);
};

/**
 * Add a collision-free guid to the db
 * @param {*} guid 
 */
export async function addGuid(guid) {
    await pool.query(
        `INSERT INTO guids (unique_id) VALUES ('${guid}')`
    );
};