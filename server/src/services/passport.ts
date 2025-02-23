import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const passportConfig = (config: { [key: string]: string }): void => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientID as string,
        clientSecret: config.clientSecret as string,
        callbackURL: config.callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user: any, done) => done(null, user.id as string));
  passport.deserializeUser((id, done) => done(null, id as string));
};

export default passportConfig;
