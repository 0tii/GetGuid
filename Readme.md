# 🆔 GetGuid Web API 

GetGuid is a bare-bones web api to receive a guaranteed collision-free GUID in line with the v4 standard (pseudo-random) and optimized for multi-access through connection pooling the MySQL database. The API is exposed through ``Express``, DB pool and queries are powered by ``mysql2`` and `util.promisify`. Pseudo-Random guids are generated using `crypto` and `Buffer`.

## Demo

**Both http and https supported**

``GET`` > [api.rauhut.me/guid](https://api.rauhut.me/guid) *~~or visit in your browser~~ (Now requires API key)* .

*Public api key: `FTVmDN3W4bqgeo6RgGMS1.cST7kLxyBD` (Valid until: 01/01/2023 - 00:00:00)*

## Setup

- Set up the database with the ``/Database/setup.sql`` file in your MySQL console:
```
> source C:\[...]\setup.sql
```

That will set up the db, tables and a few debug-guids as well as a debug api key.

- Adjust ``/cfg/config.js`` to your desired specifications.

- Start the node process and make a request.

### The config

The default config is located in ``/cfg`` as `_config.js`. This must be copied to `config.js` and adjusted to your specifications. Without `config.js` the service will not be able to run!

```javascript
{
    useSSL: true, //starts a https server alongside the standard http
    privKeyName: '', //name of the SSL private key file in /sslcert
    certName: '', //name of the SSL certificate name in /sslcert

    dbHost: 'localhost', //mysql database host
    dbUser: 'root', //mysql user
    dbPassword: '', //mysql user password
    dbPort: '/var/run/mysqld/mysqld.sock', //for windows use 3306

    maxConsecutiveCollisions: 10,  //consecutive collisions should never occur, if this threshold (> 1) is exceeded, there is an error in the code.
    getPath: "/guid", //the URI parameter to address the API
    httpPort: 3000, //port the http server listens on
    httpsPort: 3443, //port the https server listens on

    requestsPerWindow: 20,
    secondsPerWindow: 60, //default: 20 requests per 60 seconds

    advancedDebug: true //outputs some more detailed errors in console
}

```

## How collision free?

GetGuid keeps an indexed MySQL database table of all generated GUIDs. Upon generating a guid a new SQL transaction is started which checks for collision with an existing guid. If none is found the generated guid is declared valid and written back to the table. Only after this the transaction is committed. This guarantees that at no point two simultaneously generated identical guids (*talk about odds ...*) can slip through the system through query-synchronicity.

## How to GetGuid?

### Making requests

#### Get a guid

A simple get-request
```
GET [host]:[httpPort/httpsPort]/guid
```

for example
```
GET http://localhost:3000/guid
GET https://localhost:3443/guid
```

#### Get multiple guids

The maximum amount of guids to query is configurable through `config.js`.
```
GET [host]:[httpPort/httpsPort]/guids/[amount]
```

for example
```
GET http://localhost:3000/guids/5
GET https://localhost:3443/guids/10
```

### Authentication

GetGuid now uses API Key authentication. API Keys need to be issued to users before they can use this service. There is a public API Key for the example service I am hosting: `FTVmDN3W4bqgeo6RgGMS1.cST7kLxyBD`.

Api Keys must be submitted as a `API-Key` header.

### Rate Limiting

GetGuid has a configurable rate limit (`cfg/config.js`) consisting of `requestsPerWindow` and `secondsPerWindow`. It is by default configured for `20 requests per window and 60 seconds per window` therefore `20 requests per minute`.

## Format

### Response

Returns a json object with the following structure
```json
{
    "guid": "23703c80-bbe9-4f59-50f6-ef30bb399e5"
}
```
### Errors

Errors are propagated back to the user in the following format:
```json
{
    "code": 500,
    "error": "error message"
}
```

A not-regularly-updated list of errors:

- 500 - Maximum amount of collisions reached (Most probably a logic-error on the server side)
- 500 - Server error while validating API Key
- 429 - Too many requests - rate limit reached
- 401 - Unauthorized invalid key
- 401 - Unauthorized no auth / no key provided
- 401 - Unauthorized API key is expired
- 404 - No content for api root
- 400 - Invalid parameter must be an integer
- 400 - Invalid parameter exceeds allowed maximum

## Limitations

**~~GetGuid does not *(yet)* provide the following core API features:~~**

~~- Authentication / API Keys~~

~~- Rate Limiting~~

~~- SSL / HTTPS~~

## Planned Features

~~- Authentication / API Keys~~

~~- SSL/HTTPS~~

- Startup check | **WIP**
- Key generation endpoint with permission / auth
- Error handling / propagation system

~~- Rate Limiting~~

- Request specification (eg. request bulk)
- Request specific GUID standard