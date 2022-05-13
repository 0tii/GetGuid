# 🆔 GetGuid Web API 

GetGuid is a bare-bones web api to receive a guaranteed collision-free GUID in line with the v4 standard (pseudo-random).

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

**GetGuid does not provide:**

- Authentication / API Keys
- Rate Limiting

Both of which are *TODO* depending on motivation

## Planned Features

- Authentication / API Keys
- Error handling / propagation system
- Rate Limiting
- Request specification (eg. request bulk)
- Request specific GUID standard