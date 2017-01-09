var cookie = require('react-cookie');

var getUserInfo = require('../FB').getUserInfo;
var api = require('../api');

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
}

function handleFBLogin(callback) {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var user = {
        "userID": response.authResponse.userID,
        "accessToken": response.authResponse.accessToken
      };
      onLogin(user);
      // window.location.href = "/";
    } else {
        FB.login(function(response) {
          if (response.authResponse) {
            var user = {
              "userID": response.authResponse.userID,
              "accessToken": response.authResponse.accessToken
            };
            onLogin(user);
            getUserInfo(response.authResponse.accessToken, function(err, user) {
              if (!err) {
                /* eslint-disable no-unused-vars */
                api.create_user(user, function(err, body) {
                  if (!err & body == "UNIQUE_VIOLATION") {
                    // we've already created an account for this user
                    callback(null, body, "Welcome Back");
                  } else if (!err) {
                    callback(null, body, "Welcome to Helix!");
                  } else {
                    callback(err);
                  }
                /* eslint-enable no-unused-vars */
                });
              }
            });

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
