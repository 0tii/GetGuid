/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
export default {
    dbHost: 'localhost',
    dbUser: 'root',

    maxConsecutiveCollisions: 10,  //consecutive collisions should never be a thing, if this threshold (> 1) is exceeded, there is an error in the code.
    getPath: "/guid",
    listenPort: 80
}