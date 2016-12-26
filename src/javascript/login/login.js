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

function onLogin(user) {
  cookie.save("userID", user.userID, {path: "/"});
  cookie.save("auth", user.accessToken, {path: "/"});
  window.location.href = "/";
}

function handleFBLogin() {
  FB.logout();
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var user = {
        "userID": response.authResponse.userID,
        "accessToken": response.authResponse.accessToken
      };
      onLogin(user);
    } else {
        FB.login(function(response) {
          if (response.authResponse) {
            var user = {
              "userID": response.authResponse.userID,
              "accessToken": response.authResponse.accessToken
            };
            onLogin(user);
          }
        }, {scope: 'public_profile, email, user_friends'} );
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
