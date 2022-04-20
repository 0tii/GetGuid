import express from 'express';
import { generateGuid, wrapGuid } from './lib/gen.js';

const app = express();

app.get('/', (req, res) => {
    return res.send(wrapGuid(generateGuid()));
});

app.listen(3000, () => console.log('listening on port 3000...'));