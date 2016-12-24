'use strict';

var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar.js');
var Nav = require('react-bootstrap/lib/Nav.js');
var NavItem = require('react-bootstrap/lib/NavItem.js');
var NavDropdown = require('react-bootstrap/lib/NavDropdown.js');
var MenuItem = require('react-bootstrap/lib/MenuItem.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');

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
    if (this.state.profPic == "") {
      this.getProfPic();
    }
    var navLink;
    var profileOrLogin;
    if (this.props.isLoggedIn) {
      navLink = "/profile";
      profileOrLogin = "Profile";
    } else {
      navLink = "/login";
      profileOrLogin = "Login";
    }
    /* eslint-disable max-len */
    var nav =  (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Helix</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link 1</NavItem>
            <NavItem eventKey={2} href="#">Link 2</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav id = "prof-nav" pullRight>
            <NavItem eventKey={1} href="#"> <Glyphicon glyph="bell" />  Notifications</NavItem>
            <NavItem eventKey = {2} href = {navLink}> {profileOrLogin} </NavItem>
            {this.state.profPic !== ""  &&
              <NavItem eventKey = {3}>
                <img src = {this.state.profPic} style={{width: 20, height: 20}} />
              </NavItem> ||
              <NavItem eventKey = {3}>             </NavItem>
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
