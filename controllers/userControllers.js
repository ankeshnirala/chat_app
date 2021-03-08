const passport = require("passport");

exports.indexPage = (req, res) => {
  const errors = req.flash("error");

  const options = {
    title: "FootBallKik | Login",
    messages: errors,
    hasError: errors.length > 0,
  };
  res.render("index", options);
  return;
};

exports.getSignup = (req, res) => {
  const errors = req.flash("error");

  const options = {
    title: "FootBallKik | Login",
    messages: errors,
    hasError: errors.length > 0,
  };
  res.render("signup", options);
};

exports.postSignup = passport.authenticate("local-signup", {
  successRedirect: "/home",
  failureRedirect: "/signup",
  failureFlash: true,
});

exports.postLogin = passport.authenticate("local-login", {
  successRedirect: "/home",
  failureRedirect: "/signup",
  failureFlash: true,
});

exports.getFacebookLogin = passport.authenticate("facebook", {
  scope: "email",
});

exports.facebookLogin = passport.authenticate("facebook", {
  successRedirect: "/home",
  failureRedirect: "/signup",
  failureFlash: true,
});

exports.getGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleLogin = passport.authenticate("google", {
  successRedirect: "/home",
  failureRedirect: "/signup",
  failureFlash: true,
});
