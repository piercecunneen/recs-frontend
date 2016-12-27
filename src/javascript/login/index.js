var login = require('./login.js');

module.exports = {
  getLoggedInID:         login.getLoggedInID,
  onLogin:               login.onLogin,
  handleFBLogin:         login.handleFBLogin,
  getAuthToken:          login.getAuthToken,
  isLoggedIn:            login.isLoggedIn,
  resetAuthTokenCookie:  login.resetAuthTokenCookie
};