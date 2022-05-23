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
    allowCORS: false,

    useSSL: true,
    privKeyName: '',
    certName: '',

    dbHost: 'localhost',
    dbUser: 'root',
    dbPassword: '',
    dbPort: '/var/run/mysqld/mysqld.sock', //for windows use 3306

    maxConsecutiveCollisions: 10, //consecutive collisions should never be a thing, if this threshold (> 1) is exceeded, there is an error in the code.
    maxGuids: 10,
    httpPort: 3000,
    httpsPort: 3443,

    requestsPerWindow: 20,
    secondsPerWindow: 60,

    advancedDebug: true
}