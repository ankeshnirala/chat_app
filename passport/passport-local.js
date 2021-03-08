const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash("error", "User already exist!!"));
        }

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.full_name = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
          done(err, newUser);
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        const messages = [];

        if (!user || !user.validateUserPassword(password, user.password)) {
          messages.push("Email does not exist or Password is invalid!!");
          return done(null, false, req.flash("error", messages));
        }

        return done(null, user);
      });
    }
  )
);
