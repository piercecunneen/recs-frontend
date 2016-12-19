'use strict';

var React = require('react');

var Navbar = require('../sharedLayout/navbar.js');

var InitialPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
});

module.exports = InitialPage;
