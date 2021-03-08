const express = require("express");
const homeControllers = require("./../controllers/homeControllers");

const router = express.Router();

router.route("/home").get(homeControllers.homePage);

module.exports = router;
