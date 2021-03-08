exports.SignUpValidation = async (req, res, next) => {
  req.checkBody("username", "Username is required!!").notEmpty();
  req
    .checkBody("username", "Username must not be less than 5 character!!")
    .isLength({
      min: 5,
    });
  req.checkBody("email", "Email is required!!").notEmpty();
  req.checkBody("email", "Email is invalid!!").isEmail();
  req.checkBody("password", "Password is required!!").notEmpty();
  req
    .checkBody("password", "Password must not be less than 5 character!!")
    .isLength({
      min: 5,
    });

  req
    .getValidationResult()
    .then((result) => {
      const errors = result.array();
      const messages = [];

      errors.forEach((error) => {
        messages.push(error.msg);
      });

      req.flash("error", messages);
      res.redirect("/signup");
    })
    .catch((error) => {
      return next();
    });
};

exports.LoginValidation = async (req, res, next) => {
  req.checkBody("email", "Email is required!!").notEmpty();
  req.checkBody("email", "Email is invalid!!").isEmail();
  req.checkBody("password", "Password is required!!").notEmpty();
  req
    .checkBody("password", "Password must not be less than 5 character!!")
    .isLength({
      min: 5,
    });

  req
    .getValidationResult()
    .then((result) => {
      const errors = result.array();
      const messages = [];

      errors.forEach((error) => {
        messages.push(error.msg);
      });

      req.flash("error", messages);
      res.redirect("/");
    })
    .catch((error) => {
      return next();
    });
};
