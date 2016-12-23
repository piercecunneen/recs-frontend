'use strict';

// React components
var React = require('react');
var Navbar = require('../shared/navbar.js');

var login = require('../../login/login.js');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    var userID = login.getLoggedInID();
    if (userID) {
      login.onLogin(userID);
    }
    return (
      <div>
        <Navbar isLoggedIn={false}> </Navbar>;
        <button onClick={login.handleFBLogin}>
          Activate Lasers
        </button>
      </div>
    );
  }
});

module.exports = LoginPage;
