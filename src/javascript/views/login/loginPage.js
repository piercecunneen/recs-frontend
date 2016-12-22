'use strict';

var React = require('react');

var Navbar = require('../../sharedLayout/navbar.js');
var cookie = require('react-cookie');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },
  handleFBLogin: function handleFBLogin() {
    var reactThis = this;
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        reactThis.onLogin(response.authResponse.userID);
      } else {
          FB.login(function(response) {
            if (response.authResponse) {
              reactThis.onLogin(response.authResponse.userID);
            }
          });
        }
    });
    return true;
  },

  onLogin: function onLogin(userID) {
    cookie.save("userID", userID, {path: "/"});
  },

  checkLogin: function checkLogin() {
    var userID = cookie.load("userID");
    if (userID) {
      // redirect logged in user to home page
      window.location.href = "/";
    }
  },

  render: function render() {
    this.checkLogin();
    return (
      <div>
        <Navbar> </Navbar>;
        <button onClick={this.handleFBLogin}>
          Activate Lasers
        </button>
      </div>
    );
  }
});

module.exports = LoginPage;
