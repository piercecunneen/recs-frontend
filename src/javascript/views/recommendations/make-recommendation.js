'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Navbar = require('../shared/navbar.js');
var FriendSearch = require('../shared/friend-search.js');


var FaceBook = require('../../FB');
var login = require('../../login');

var makeRecommendation = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works',
      friends: undefined
    };
  },


  componentDidMount: function componentDidMount() {
    FaceBook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        this.setState({
          friends: friends
        });
      }.bind(this)
    );
  },

  render: function render() {
    var friends;
    this.state.friends === undefined ?
      friends = [] :
      friends = this.state.friends.data;
    /* eslint-disable max-len*/

    return (
       <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xsOffset={4} xs={4}>
               <FriendSearch friends = {friends}> </FriendSearch>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = makeRecommendation;
