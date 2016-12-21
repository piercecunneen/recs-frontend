'use strict';

var React = require('react');

var Navbar = require('../../sharedLayout/navbar.js');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar> </Navbar>;
      </div>
    );
  }
});

module.exports = LoginPage;
