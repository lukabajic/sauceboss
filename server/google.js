const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('./models/User');
const { isArrayWithItems } = require('./utils/helpers');
const { saveError, logErorr } = require('./utils/errors');

const verify = async (accessToken, refreshToken, { id, emails, displayName, photos }, done) => {
  let email;
  let avatarUrl;

  if (isArrayWithItems(emails)) email = emails[0].value;
  if (isArrayWithItems(photos)) avatarUrl = photos[0].value.replace('sz=50', 'sz=128');

  try {
    const user = await User.signInOrSignUp({
      googleId: id,
      googleToken: { accessToken, refreshToken },
      email,
      displayName,
      avatarUrl,
    });

    done(null, user);
  } catch (error) {
    error.where = 'verify';
    await logErorr(error);
    done(error);
  }
};

const setupGoogle = ({ rootUrl, server }) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: `${rootUrl}/auth/google/callback`,
        // passReqToCallback: true,
      },
      verify,
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id, User.publicFields());
      done(null, user);
    } catch (error) {
      error.where = 'passport.deserializeUser';
      await logErorr(error);
      done(error);
    }
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/auth/google/failure',
    }),
  );

  server.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' }),
  );

  server.get('/logout', (req, res) => {
    req.logout(async (err) => {
      if (err) {
        await saveError(err, 'server.get("/logout")', 500);
        return res.redirect('/500');
      }
      res.redirect('/');
    });
  });
};

module.exports = setupGoogle;
