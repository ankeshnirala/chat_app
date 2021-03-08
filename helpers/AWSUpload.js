const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const secret = require("./../secrets/secretFile");

aws.config.update({
  accessKeyId: secret.s3bucket.accessKey,
  secretAccessKey: secret.s3bucket.secretKey,
});

const S3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: "mychatapp",
    acl: "public-read",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, file.originalname);
    },
    rename(fieldName, fileName) {
      return fileName.replace(/\w+/g, "-").toLowerCase();
    },
  }),
});

exports.Upload = upload;
