'use strict';

// React components
var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var login = require('../../login');
var FB = require('../../FB');

var LoginPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    var userID = login.getLoggedInID();
    if (userID) {
      // window.location.href = "/";
    }
    FB.fbInit();
    /* eslint-disable max-len*/
    return (
      <div>
        <Navbar isLoggedIn={false}> </Navbar>
        <Grid>
         <Row className="show-grid">
            <Col xsOffset={3} xs={6}>
              <h2> Welcome to Helix!Pleas login in via Facebook to ensure a better user experience </h2>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xsOffset={5} xs={6}>
              <button onClick={login.handleFBLogin}> Login </button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
    /* eslint-enable max-len*/
  }
});

module.exports = LoginPage;
