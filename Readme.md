# 🆔 GetGuid Web API 

GetGuid is a bare-bones web api to receive a guaranteed collision-free GUID in line with the v4 standard (pseudo-random) and optimized for multi-access through connection pooling the MySQL database. The API is exposed through ``Express``, DB pool and queries are powered by ``mysql2`` and `util.promisify`. Pseudo-Random guids are generated using `crypto` and `Buffer`.

## Demo

**(!SSL/HTTPS coming soon!)**
``GET`` > [api.rauhut.me/guid](http://api.rauhut.me/guid) *or visit in your browser*.

## Setup

- Set up the database with the ``/Database/setup.sql`` file in your MySQL console.
```
> source C:\[...]\setup.sql
```

That will set up the db, table and a few debug-guids.

- Adjust ``/cfg/config.js`` to your desired specifications.

- Start the node process and make a request.

## How collision free?

GetGuid keeps an indexed MySQL database table of all generated GUIDs. Upon generating a guid a new SQL transaction is started which checks for collision with an existing guid. If none is found the generated guid is declared valid and written back to the table. Only after this the transaction is committed. This guarantees that at no point two simultaneously generated identical guids (*talk about odds ...*) can slip through the system through query-synchronicity.

## How to GetGuid?

A simple get-request
```
GET [host]:[listenPort]/[getPath]
```

for example
```
GET localhost:3500/guid
```

## Format

Returns a json object with the following structure
```json
{
    "guid": "23703c80-bbe9-4f59-50f6-ef30bb399e5"
}
```

So far only one server-side error is propagated back to the client, with an error code 500. As time goes on this will change.
```json
{
    "code": 500,
    "error": "error message"
}
```

## Limitations

**GetGuid does not *(yet)* provide the following core API features:**

- Authentication / API Keys
- Rate Limiting
- SSL / HTTPS

Both of which are *TODO* depending on motivation

## Planned Features

- Authentication / API Keys
- SSL/HTTPS 
- Error handling / propagation system
- Rate Limiting
- Request specification (eg. request bulk)
- Request specific GUID standard