'use strict';

var React = require('react');
var Navbar = require('../sharedLayout/navbar.js');

var login = require('../login/login.js');
var InitialPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
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

module.exports = InitialPage;
