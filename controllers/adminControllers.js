const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const AWSUpload = require("./../helpers/AWSUpload");
const clubs = require("./../models/clubModels");

exports.adminPage = (req, res) => {
  res.render("admin/dashboard");
};

exports.uploadFile = (req, res) => {
  // const form = new formidable.IncomingForm();
  //   form.uploadDir = path.join(__dirname, "../public/uploads");
  // form.on("file", (field, file) => {
  // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
  //   if (err) throw err;
  //   console.log("File renamed successfully!!");
  // });
  // });

  // form.on("error", (err) => {
  //   console.log(err);
  // });

  // form.on("end", () => {
  //   console.log("File upload is successful!!");
  // });
  console.log("File upload is successful!!");
  // form.parse(req);
};

exports.adminPostPage = (req, res) => {
  const newClub = new clubs();

  newClub.name = req.body.club;
  newClub.country = req.body.country;
  newClub.image = req.body.upload;

  newClub.save((err) => {
    res.render("admin/dashboard");
  });
};
