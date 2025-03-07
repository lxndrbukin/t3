import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import path from 'path';

import passportConfig from './services/passport';
import connectToMongoDB from './db';
import api from './routes/api';

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/v1/auth/google/callback',
  sessionSecret: process.env.SESSION_SECRET as string,
};

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'session',
    keys: [config.sessionSecret],
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use(passport.initialize());
app.use((req, res, next) => {
  if (!req.session) {
    req.session = {} as any;
  }
  (req.session as any).regenerate = (cb: (err?: Error) => void) => cb();
  (req.session as any).save = (cb: (err?: Error) => void) => cb();

  next();
});
app.use(passport.session());

passportConfig(config);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/v1', api);

connectToMongoDB();

const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, (): void => {
  console.log('Server is running on', PORT);
});
