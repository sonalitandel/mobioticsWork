const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-1' //E.g us-east-1
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'myawsbucketa07',
    key: function(req, file, cb) {
      /*I'm using Date.now() to make sure my file has a unique name*/
      console.log('inside file upload file')
      req.file = Date.now() + file.originalname;
      cb(null, Date.now() + file.originalname);
    }
  })
});

module.exports = upload;
