import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/user.model';

const passportConfig = (config: { [key: string]: string }): void => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientID as string,
        clientSecret: config.clientSecret as string,
        callbackURL: config.callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user: any, done) => done(null, user as string));
  passport.deserializeUser(async (user: any, done) => {
    const userData = await User.findOne({ googleId: user.id });
    return done(null, userData);
  });
};

export default passportConfig;
