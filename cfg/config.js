/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
export default {
    dbHost: 'localhost',
    dbUser: 'root',

    maxConsecutiveCollisions: 10,
    getPath: "/guid",
    listenPort: 80
}