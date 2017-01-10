'use strict';

var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar.js');
var Nav = require('react-bootstrap/lib/Nav.js');
var NavItem = require('react-bootstrap/lib/NavItem.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var Image = require('react-bootstrap/lib/Image.js');

var NavSearch = require('./nav-search.js');
var LoginModal = require('../login/login-modal.js');

var login = require('../../login');
var Facebook = require('../../FB');


var NavBar = React.createClass({
  getInitialState: function getInitialState() {
    return {
      profPic: "",
      userID: login.getLoggedInID(),
      userAuth: login.getAuthToken()
    };
  },

  getProfPic: function getProfPic() {
    var url = '/';
    url = url.concat(
      this.state.userID,
      '/picture/?access_token=',
      this.state.userAuth
    );
    FB.api(
      url,
      function(response) {
        if (! response.error) {
          this.setState({profPic: response.data.url});
        }
      }.bind(this));
  },

  componentDidMount: function componentDidMount() {
    Facebook.FBinitialize(this.getProfPic);
  },

  render: function render() {

    /* eslint-disable max-len */
    var nav =  (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Helix</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/my-recs">My Recs</NavItem>
            <NavItem eventKey={2} href="/my-requests">My Requests</NavItem>
            <NavItem eventKey={3}> <NavSearch>  </NavSearch> </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href="#"> <Glyphicon glyph="bell" />  Notifications</NavItem>
            {this.state.profPic === "" &&
              <NavItem eventKey = {5} > <LoginModal> </LoginModal> </NavItem> ||
              <NavItem eventKey = {5} href = {"/profile"}> Profile </NavItem>
            }
            {this.state.profPic !== ""  &&
              <NavItem href = "/profile" eventKey = {6}>
                 <Image src={this.state.profPic} style={{height: 30, width: 30}} circle responsive />
              </NavItem> ||
              <NavItem eventKey = {6}>             </NavItem>
            }
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
    return nav;
    /* eslint-disable max-len */
  }
});

module.exports = NavBar;
