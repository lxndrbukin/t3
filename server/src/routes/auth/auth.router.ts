import { Router } from 'express';
import passport from 'passport';

import { login, register, logout, getUser } from './auth.controller';

const router: Router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  (req, res) => {
    res.redirect('/');
  }
);
router.get('/user', getUser);
router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);

export default router;
