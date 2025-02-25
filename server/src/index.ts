import express, { Request, Response } from 'express';
import http from 'http';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';

import User from './models/user.model';
import passportConfig from './services/passport';
import connectToMongoDB from './db';
import api from './routes/api';

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/auth/google/callback',
  sessionSecret: process.env.SESSION_SECRET as string,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 30,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig(config);

app.get('/', (req: Request, res: Response): void => {
  if (!req.session.passport) {
    res.status(401).send('You are not logged in!');
  } else {
    console.log(req.user);
    res.send(`Welcome back!`);
  }
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

app.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.use('/v1', api);

connectToMongoDB();

const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, (): void => {
  console.log('Server is running on', PORT);
});
