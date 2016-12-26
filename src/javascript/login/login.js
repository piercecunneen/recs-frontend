var cookie = require('react-cookie');

function getLoggedInID() {
  var userID = cookie.load("userID");
  return userID !== undefined ? userID : false;
}

function isLoggedIn() {
  var userID = cookie.load("userID");
  return userID !== undefined ? true : false;
}

function getAuthToken() {
  var authToken = cookie.load("auth");
  return authToken !== undefined ? authToken : false;
}

function resetAuthTokenCookie() {
  cookie.remove("auth", {path: "/"});
}

function onLogin(userID, authToken) {
  cookie.save("userID", userID, {path: "/"});
  cookie.save("auth", authToken, {path: "/"});
  window.location.href = "/";
}

function handleFBLogin(callback) {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      onLogin(response.authResponse.userID,response.authResponse.accessToken);
      if (callback) {
        callback(
          response.authResponse.userID,
          response.authResponse.accessToken
        );
      }
    } else {
        FB.login(function(response) {
          if (response.authResponse) {
            onLogin(
              response.authResponse.userID,
              response.authResponse.accessToken
            );
            if (callback) {
              callback(
                response.authResponse.userID,
                response.authResponse.accessToken
              );
            }
          }
        });
      }
    });
    return true;
}

module.exports = {
  getLoggedInID:         getLoggedInID,
  onLogin:               onLogin,
  handleFBLogin:         handleFBLogin,
  getAuthToken:          getAuthToken,
  isLoggedIn:            isLoggedIn,
  resetAuthTokenCookie:  resetAuthTokenCookie
};
