var cookie = require('react-cookie');

function getLoggedInID() {
  var userID = cookie.load("userID");
  return userID !== undefined ? userID : false;
}

function onLogin(userID) {
  cookie.save("userID", userID, {path: "/"});
  window.location.href = "/";
}

function handleFBLogin() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      onLogin(response.authResponse.userID);
    } else {
        FB.login(function(response) {
          if (response.authResponse) {
            onLogin(response.authResponse.userID);
          }
        });
      }
    });
    return true;
}

module.exports = {
  getLoggedInID: getLoggedInID,
  onLogin:       onLogin,
  handleFBLogin: handleFBLogin
};
