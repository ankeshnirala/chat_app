const express = require("express");
const groupControllers = require("./../controllers/groupControllers");

const router = express.Router();

router
  .route("/group/:name")
  .get(groupControllers.groupPage)
  .post(groupControllers.postPage);

module.exports = router;
