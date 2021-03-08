const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("./../models/userModel");
const secret = require("./../secrets/secretFile");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    secret.google,
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ google: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        const newUser = new User();
        newUser.google = profile.id;
        newUser.full_name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.username = profile.displayName.replace(" ", "").toLowerCase();

        newUser.userImage = profile.photos[0].value;

        newUser.save((err) => {
          done(err, newUser);
        });
      });
    }
  )
);
