import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { login, logout } from './auth.controller';

const router: Router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  login
);

router.get('/logout', logout);

export default router;
