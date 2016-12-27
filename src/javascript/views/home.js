'use strict';

var React = require('react');
var Navbar = require('./shared/navbar.js');

var login = require('../login');

var InitialPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar isLoggedIn={login.isLoggedIn()}> </Navbar>
      </div>
    );
  }
});

module.exports = InitialPage;
