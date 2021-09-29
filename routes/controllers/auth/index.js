const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./current');
const updateAvatar = require('./updateAvatar');
const verifyMail = require('./verifyMail');
const sendAgain = require('./sendAgain');

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyMail,
  sendAgain,
};
