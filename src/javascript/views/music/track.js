var React = require('react');
var Navbar = require('../shared/navbar.js');

var login = require('../../login');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <h1> {this.props.routeParams.title} </h1>
      </div>
    );
  }
});

module.exports = Track;
