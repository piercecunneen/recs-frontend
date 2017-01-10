'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Tab = require('react-bootstrap/lib/Tab.js');
var Nav = require('react-bootstrap/lib/Nav.js');
var NavItem = require('react-bootstrap/lib/NavItem.js');


var Navbar = require('../shared/navbar.js');
var ProfileRequests = require('./profile-requests.js');
var ProfileRecs = require('./profile-recs.js');
var ProfileFavorites = require('./profile-favorites.js');


var login = require('../../login');
var api = require('../../api');
var Facebook = require('../../FB');

var Profile = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works',
      contentType: "Recommendations",
      user_friends: [],
      recommendations: [],
      favorites: []
    };
  },

  showRecs: function showRecs() {
    this.setState({
      contentType: "Recommendations"
    });
  },

  showFavs: function showFavs() {
    this.setState({
      contentType: "Favorites"
    });
  },

  showRequests: function showRequests() {
    this.setState({
      contentType: "Requests"
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
    api.get_user_favorites(
      login.getLoggedInID(),
      function(err, body) {
        if (!err) {
          this.setState({
            favorites: body.favorites
          });
        }
      }.bind(this)
    );
    Facebook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        if (!err) {
          this.setState({
            user_friends: friends
          });
        }
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
              <h2 style={{'text-align': "center"}}> My {this.state.contentType} </h2>
            </Col>
          </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="recommendations">
          <Grid>
            <Row className="clearfix">
              <Col xs={3} sm={3} md={3} lg={3}>
                <Row>
                  <Nav bsStyle="pills" stacked>
                    <NavItem onClick={this.showRequests} eventKey="requests">
                      Requests
                    </NavItem>
                    <NavItem onClick={this.showRecs} eventKey="recommendations">
                      Recommendations
                    </NavItem>
                    <NavItem onClick={this.showFavs} eventKey="favorites">
                      Favorites
                    </NavItem>
                  </Nav>
                </Row>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="requests">
                    <ProfileRequests requests={this.state.requests} friends={this.state.user_friends}> </ProfileRequests>
                  </Tab.Pane>
                  <Tab.Pane eventKey="recommendations">
                    <ProfileRecs type={"all"} recommendations={this.state.recommendations} friends={this.state.user_friends}> </ProfileRecs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="favorites">
                    <ProfileFavorites favorites={this.state.favorites} friends={this.state.user_friends}> </ProfileFavorites>
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
