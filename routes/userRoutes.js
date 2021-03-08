const express = require("express");
const userControllers = require("./../controllers/userControllers");
const userValidation = require("./../helpers/user");

const router = express.Router();

router
  .route("/")
  .get(userControllers.indexPage)
  .post(userValidation.LoginValidation, userControllers.postLogin);

router.route("/auth/facebook").get(userControllers.getFacebookLogin);
router.route("/auth/facebook/callback").get(userControllers.facebookLogin);

router.route("/auth/google").get(userControllers.getGoogleLogin);
router.route("/auth/google/callback").get(userControllers.googleLogin);

router
  .route("/signup")
  .get(userControllers.getSignup)
  .post(userValidation.SignUpValidation, userControllers.postSignup);

module.exports = router;
