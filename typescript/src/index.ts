import express from 'express';
import helloWorld from './routes';

const app = express();

app.get('/', (req, res) => {
    return res.json(helloWorld);
});

const serverPort = 3334;
app.listen(serverPort, () => {
    console.log(`🚀 server started on port:${serverPort}`);
});