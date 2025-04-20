import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model';

export default function passportConfig(config: {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        passReqToCallback: true,
      },
      async (_req, _accessToken, _refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = new User({
              userId: (await User.countDocuments()) + 1,
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value,
            });
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((userData: any, done) => {
    done(null, userData.userId);
  });

  passport.deserializeUser(async (userId: number, done) => {
    try {
      const user = await User.findOne({ userId }).select('-__v -_id');
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
