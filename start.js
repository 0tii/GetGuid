import express from 'express';
import { generateGuid } from './lib/gen.js';

const app = express();

app.get('/', (req, res) => {
    return res.send(generateGuid());
});

app.listen(3000, () => console.log('listening on port 3000...'));