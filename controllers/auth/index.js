const registr = require('./registration');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./current');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');

module.exports = {
  registr,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
};
