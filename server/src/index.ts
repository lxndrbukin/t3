import express, { Request, Response } from 'express';
import http from 'http';

import connectToMongoDB from './db';
import api from './routes/api';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/v1', api);

connectToMongoDB();

const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, (): void => {
  console.log('Server is running on', PORT);
});
