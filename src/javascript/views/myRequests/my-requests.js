'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var ListGroup = require('react-bootstrap/lib/ListGroup.js');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem.js');

var Navbar = require('../shared/navbar.js');

var login = require('../../login/login.js');
/* eslint-disable max-len*/
var dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];
/* eslint-enable max-len*/
var myRequests = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works'
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    return (
       <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xsOffset={3} xs={6} smOffset={3} sm={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
              <h2 style={{align: "center"}}> My Requests </h2>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={3} sm={3} md={3} lg={3}>
              <Row>
                <h3> Types </h3>
              </Row>
              <Row>
                <ListGroup>
                  <ListGroupItem href="#all">All</ListGroupItem>
                  <ListGroupItem href="#songs">Songs</ListGroupItem>
                  <ListGroupItem href="#artists">Artists</ListGroupItem>
                </ListGroup>
              </Row>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}
            </Col>
            <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}
            </Col>
            <Col xs={9} sm={9} md={9} lg={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 2).join(' ')}
            </Col>
          </Row>
        </Grid>
      </div>
    );
   /* eslint-enable max-len*/
  }
});

module.exports = myRequests;
