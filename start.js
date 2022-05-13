import express from 'express';
import { generateGuidObject, genError } from './lib/gen.js';
import cfg from './cfg/config.js';

const app = express();

app.get(cfg.guidPath, async (req, res) => {
    let guid = await generateGuidObject();
    
    if(guid.guid != '-1')
        return res.send(guid);
    else{
        res.status(500)
        return res.send(genError);
    }
});

app.listen(cfg.listenPath, () => console.log(`listening on port ${cfg.listenPort}...`));