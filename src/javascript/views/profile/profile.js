'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');

var login = require('../../login/login.js');

var Profile = React.createClass({
  getInitialState: function getInitialState() {
    return {
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
      </div>
    );
  }
});

module.exports = Profile;
