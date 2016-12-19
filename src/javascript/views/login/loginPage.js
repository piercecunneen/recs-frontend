'use strict';

var React = require('react');

var Navbar = require('../../sharedLayout/navbar.js');
var LoginBox = require('./loginBox.js');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar />
        <LoginBox />
      </div>
    );
  }
});

module.exports = LoginPage;
