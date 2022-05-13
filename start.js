import express from 'express';
import { generateGuidObject, genError } from './lib/gen.js';

const app = express();

app.get('/api/', async (req, res) => {
    let guid = await generateGuidObject();
    console.log(guid.guid);
    if(guid.guid != '-1')
        return res.send(guid);
    else{
        res.status(500)
        return res.send(genError);
    }
});

app.listen(80, () => console.log('listening on default port 80...'));