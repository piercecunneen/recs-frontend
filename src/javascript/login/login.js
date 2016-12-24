var cookie = require('react-cookie');

function getLoggedInID() {
  var userID = cookie.load("userID");
  return userID !== undefined ? userID : false;
}

function getAuthToken() {
  var authToken = cookie.load("auth");
  return authToken !== undefined ? authToken : false;
}
function onLogin(userID, authToken) {
  cookie.save("userID", userID, {path: "/"});
  cookie.save("auth", authToken, {path: "/"});
  window.location.href = "/";
}

function handleFBLogin() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      onLogin(response.authResponse.userID, response.authResponse.accessToken);
    } else {
        FB.login(function(response) {
          if (response.authResponse) {
            onLogin(
              response.authResponse.userID,
              response.authResponse.accessToken
            );
          }
        });
      }
    });
    return true;
}

module.exports = {
  getLoggedInID: getLoggedInID,
  onLogin:       onLogin,
  handleFBLogin: handleFBLogin,
  getAuthToken:  getAuthToken
};
