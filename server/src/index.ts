import express, { Request, Response } from 'express';
import http from 'http';

import connectToMongoDB from './db';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

connectToMongoDB();

const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, (): void => {
  console.log('Server is running on', PORT);
});
