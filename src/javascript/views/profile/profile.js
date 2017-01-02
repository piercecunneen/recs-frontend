'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var ListGroup = require('react-bootstrap/lib/ListGroup.js');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem.js');

var Navbar = require('../shared/navbar.js');
var ProfileMainContent = require('./profile-main-content.js');


var login = require('../../login');

var Profile = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    var url = this.props.location.pathname.split('/');
    var end_of_path = url.slice(-1) == "/" ? url.slice(-2, -1)[0] : url.slice(-1)[0];

    var header2;
    if (end_of_path == "recs") {
      header2 = "Recommendations";
    } else if (end_of_path == "favorites") {
      header2 = "Favorites";
    } else {
      header2 = "Requests";
    }
    return (
       <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xsOffset={3} xs={6} smOffset={3} sm={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
              <h2 style={{align: "center"}}> My {header2} </h2>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={3} sm={3} md={3} lg={3}>
              <Row>
                <h3> Feeds </h3>
              </Row>
              <Row>
                <ListGroup>
                  <ListGroupItem href="/profile">Requests</ListGroupItem>
                  <ListGroupItem href="/profile/recs">Recommendations</ListGroupItem>
                  <ListGroupItem href="/profile/favorites">Favorites </ListGroupItem>
                </ListGroup>
              </Row>
            </Col>
            <ProfileMainContent feed={end_of_path}> </ProfileMainContent>
          </Row>
        </Grid>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = Profile;
