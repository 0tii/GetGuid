/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import express from 'express';
import { generateGuidObject, genError } from './lib/gen.js';
import cfg from './cfg/config.js';
import { verifyApiKey } from './lib/verify_key.js';

const app = express();

//unprotected root
if (cfg.getPath != '/')
    app.get('/', (req, res) => {
        res.status(404);
        return res.send({ "error": "No content for api root." });
    });

//protect all other api paths
// Header: API-Key 
app.use(async (req, res, next) => {
    switch(await verifyApiKey(req)){
        case 1:
            next(); //authenticated
            break;
        case 0:
            res.status(401).json({error: "Unauthorized - Invalid Key."});
            break;
        case -1:
            res.status(401).json({error: "Unauthorized - No Auth header / No Key provided."});
            break;
        case -2:
            res.status(500).json({error: "Server error while validating API Key."});
            break;
    }
});

app.get(cfg.getPath, async (req, res) => {
    let guid = await generateGuidObject();

    if (guid.guid != '-1')
        return res.send(guid);
    else {
        res.status(500)
        return res.send(genError(500, "Maximum amount of collisions reached during generation of guid. Something went wrong."));
    }
});

app.listen(cfg.listenPort, () => console.log(`listening on port ${cfg.listenPort}...`));