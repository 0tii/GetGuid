/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/

/*
This is the default config file shipped. rename this to config.js for it to take effect.
*/
export default {
    dbHost: 'localhost',
    dbUser: 'root',
    dbPort: '/var/run/mysqld/mysqld.sock', //for windows use 3306

    maxConsecutiveCollisions: 10,  //consecutive collisions should never be a thing, if this threshold (> 1) is exceeded, there is an error in the code.
    getPath: "/guid",
    listenPort: 3000
}