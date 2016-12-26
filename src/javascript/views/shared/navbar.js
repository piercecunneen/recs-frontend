'use strict';

var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar.js');
var Nav = require('react-bootstrap/lib/Nav.js');
var NavItem = require('react-bootstrap/lib/NavItem.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');

var NavSearch = require('./nav-search.js');

var login = require('../../login/login.js');


var NavBar = React.createClass({
  getInitialState: function getInitialState() {
    return {
      profPic: ""
    };
  },

  getProfPic: function getProfPic() {
    var url = '/';
    url = url.concat(
      this.props.isLoggedIn,
      '/picture/?access_token=',
      login.getAuthToken()
    );
    FB.api(
      url,
      function(response) {
        if (response) {
          this.setState({profPic: response.data.url});
        }
      }.bind(this));
  },

  render: function render() {
    var navLink;
    var profileOrLogin;
    if (this.props.isLoggedIn) {
      navLink = "/profile";
      profileOrLogin = "Profile";
      if (this.state.profPic == "") {
        this.getProfPic();
      }
    } else {
      navLink = "/login";
      profileOrLogin = "Login";
    }

    /* eslint-disable max-len */
    var nav =  (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Helix</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Toggle />
          <Nav>
            <NavItem eventKey={1} href="/my-recs">My Recs</NavItem>
            <NavItem eventKey={2} href="/my-requests">My Requests</NavItem>
            <NavItem eventKey={3}> <NavSearch>  </NavSearch> </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href="#"> <Glyphicon glyph="bell" />  Notifications</NavItem>
            <NavItem eventKey = {5} href = {navLink}> {profileOrLogin} </NavItem>
            {this.state.profPic !== ""  &&
              <NavItem eventKey = {6}>
                <img src = {this.state.profPic} style={{width: 20, height: 20}} />
              </NavItem> ||
              <NavItem eventKey = {6}>             </NavItem>
            }
          </Nav>
      </Navbar>
    );
    return nav;
    /* eslint-disable max-len */
  }
});

module.exports = NavBar;
