const express = require("express");
const adminControllers = require("./../controllers/adminControllers");

const AWSUpload = require("./../helpers/AWSUpload");

const router = express.Router();

router
  .route("/dashboard")
  .get(adminControllers.adminPage)
  .post(adminControllers.adminPostPage);

router
  .route("/uploadFile")
  .post(AWSUpload.Upload.any(), adminControllers.uploadFile);

module.exports = router;
