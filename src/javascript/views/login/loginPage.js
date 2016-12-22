'use strict';

var React = require('react');
var Navbar = require('../../sharedLayout/navbar.js');

var login = require('../../login/login.js');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    login.getLoggedInID();
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
