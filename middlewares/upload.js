const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, rfile, cb) => {
    cb(null, rfile.originalname);
  },
  limits: {
    filesize: 1024,
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = upload;
