'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Tab = require('react-bootstrap/lib/Tab.js');
var Nav = require('react-bootstrap/lib/Nav.js');
var NavItem = require('react-bootstrap/lib/NavItem.js');


var Navbar = require('../shared/navbar.js');
var ProfileRecs = require('../profile/profile-recs.js');


var login = require('../../login');
var api = require('../../api');
var Facebook = require('../../FB');


var Profile = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works',
      contentType: "Recommendations",
      user_friends: [],
      recommendations: []
    };
  },

  showRecs: function showRecs() {
    this.setState({
      contentType: "Recommendations"
    });
  },

  componentDidMount: function componentDidMount() {
    api.get_user_recommendations(
      login.getLoggedInID(),
      function(err, body) {
        if (!err) {
          this.setState({
            recommendations: body.recommendations
          });
        }
      }.bind(this)
    );
    Facebook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        this.setState({
          user_friends: friends
        });
      }.bind(this)
    );
  },

  render: function render() {
    /* eslint-disable max-len*/

    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
          <Row className="show-grid">
            <Col xsOffset={4} xs={6} smOffset={4} sm={6} mdOffset={4} md={6} lgOffset={4} lg={6}>
              <h2 style={{align: "center"}}> My {this.state.contentType} </h2>
            </Col>
          </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
          <Grid>
            <Row className="clearfix">
              <Col xs={3} sm={3} md={3} lg={3}>
                <Row>
                  <Nav bsStyle="pills" stacked>
                    <NavItem onClick={this.showRecs} eventKey="all">
                      All
                    </NavItem>
                    <NavItem onClick={this.showRecs} eventKey="songs">
                      Songs
                    </NavItem>
                    <NavItem onClick={this.showRecs} eventKey="artists">
                      Artists
                    </NavItem>
                    <NavItem onClick={this.showRecs} eventKey="albums">
                      Albums
                    </NavItem>
                  </Nav>
                </Row>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="all">
                    <ProfileRecs type={'all'} recommendations={this.state.recommendations} friends={this.state.user_friends}> </ProfileRecs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="songs">
                    <ProfileRecs type={'track'} recommendations={this.state.recommendations} friends={this.state.user_friends}> </ProfileRecs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="artists">
                    <ProfileRecs type={'artist'} recommendations={this.state.recommendations} friends={this.state.user_friends}> </ProfileRecs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="albums">
                    <ProfileRecs type={'album'} recommendations={this.state.recommendations} friends={this.state.user_friends}> </ProfileRecs>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Grid>
        </Tab.Container>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = Profile;
