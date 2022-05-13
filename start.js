/*
GetGuid Rest API
- A simple Web API to receive a guaranteed collision-free guid
License: MIT
© Daniel H. Rauhut 2022
*/
import express from 'express';
import { generateGuidObject, genError } from './lib/gen.js';
import cfg from './cfg/config.js';

const app = express();

if (cfg.getPath != '/')
    app.get('/', (req, res) => {
        res.status(404);
        return res.send("No content for api root.");
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