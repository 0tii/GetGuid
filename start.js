/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import express from 'express';
import fs from 'fs';
import https from 'https';
import { generateGuidObject, generateMultiGuid, genError } from './lib/generate_guid.js';
import cfg from './cfg/config.js';
import { verifyApiKey } from './lib/verify_key.js';
import { checkRateLimit } from './lib/rate_limit.js';
import { bootCheck } from './lib/boot_check.js';
import { createPrivateKey } from 'crypto';

//check run requirements
await bootCheck();

//init
const app = express();

//unprotected root
if (cfg.getPath != '/')
    app.get('/', (req, res) => {
        res.status(404);
        return res.send({ "error": "No content for api root." });
    });

/*
Middleware section
- Key Authentication
- Rate limiting
*/

// Key Authentication
// Header:
// [API-Key | value]
app.use(async (req, res, next) => {
    switch (await verifyApiKey(req)) {
        case 1:
            next(); //authenticated
            break;
        case 0:
            res.status(401).json({ error: "Unauthorized - Invalid Key." });
            break;
        case -1:
            res.status(401).json({ error: "Unauthorized - No Auth header / No Key provided." });
            break;
        case -2:
            res.status(500).json({ error: "Server error while validating API Key." });
            break;
        case -3:
            res.status(401).json({ error: "Unauthorized - API Key is expired." });
            break;
    }
});

// Bucket Token based rate limiting as per config rates
app.use((req, res, next) => {
    const key = req.get('API-Key');
    if (checkRateLimit(key))
        next();
    else
        res.status(429).json({ error: "Too many requests - You are exceeding the allowed rate limit." });
});

/*
Routes
*/

app.get("/guid", async (req, res) => {
    let guid = await generateGuidObject();

    if (guid.guid != '-1')
        return res.send(guid);
    else {
        res.status(500)
        return res.send(genError(500, "Maximum amount of collisions reached during generation of guid. Something went wrong."));
    }
});

app.get('/guids/:count(*)', async (req, res) => {
    let amount = req.params.count;
    let x;

    if (!(isNaN(amount) ? !1 : (x = parseFloat(amount), (0 | x) === x))) {
        res.status(400);
        return res.send({ error: "Invalid parameter - must be an integer." });
    }

    if(amount > cfg.maxGuids){
        res.status(400);
        return res.send({error: "Invalid parameter - exceeds allowed maximum"});
    }

    let guids = await generateMultiGuid(amount);

    if (guids != '-1')
        return res.send(guids);
    else {
        res.status(500)
        return res.send(genError(500, "Maximum amount of collisions reached during generation of guids. Something went wrong."));
    }
});

app.get("(*)", (req, res)=>{
    res.status(400);
    return res.send({error: "Invalid resource. There is nothing here."});
});

if (cfg.useSSL)
    https.createServer({
        key: fs.readFileSync(`./sslcert/${cfg.privKeyName}`),
        cert: fs.readFileSync(`./sslcert/${cfg.certName}`)
    }, app).listen(cfg.httpsPort, () => console.log(`[https] listening on port ${cfg.httpsPort}...`));

app.listen(cfg.httpPort, () => console.log(`[http] listening on port ${cfg.httpPort}...`));