import express from 'express';
import { generateGuid, wrapGuid } from './lib/gen.js';

const app = express();

app.get('/api/', (req, res) => {
    return res.send(wrapGuid(generateGuid()));
});

app.listen(80, () => console.log('listening on default port 80...'));