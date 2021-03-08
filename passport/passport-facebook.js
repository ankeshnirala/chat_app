const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

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
  new FacebookStrategy(
    secret.facebook,
    (req, token, refreshToken, profile, done) => {
      User.findOne({ facebook: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        const newUser = new User();
        newUser.facebook = profile.id;
        newUser.username = profile.displayName.replace(" ", "").toLowerCase();
        newUser.full_name = profile.displayName;
        newUser.email = profile._json.email;
        newUser.userImage =
          "https://graph.facebook.com/" + profile.id + "/picture?type=large";

        newUser.save((err) => {
          done(err, newUser);
        });
      });
    }
  )
);
