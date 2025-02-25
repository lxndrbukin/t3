import { Router } from 'express';
import passport from 'passport';

import { login, signup, logout } from './auth.controller';

const router: Router = Router();

router.get(
  '/',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  login
);

router.get(
  '/signup',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/signup/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  signup
);

router.get('/logout', logout);

export default router;
