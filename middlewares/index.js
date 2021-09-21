const validationMiddleware = require('./validation');
const authenticateMiddleware = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validationMiddleware,
  authenticateMiddleware,
  upload,
};
