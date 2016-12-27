'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var login = require('../../login');
var music = require('../../spotifyAPI/getMusicData');

var Tracl = React.createClass({
  getInitialState: function getInitialState() {
    return {
      song: ''

    };
  },

  getSongData: function getSongData() {
    music.getSongs([this.state.songID], function(err, songs) {
      if (! err && songs.length == 1) {
        this.setState({
          song: songs[0]
        });
      }
    }.bind(this));
  },

  render: function render() {
    /* eslint-disable max-len */
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xsOffset={5} xs={5} >
              <h2 style={{align: "center"}}> {this.props.routeParams.title} </h2>
            </Col>
          </Row>
          <Row className="show-grid">
          </Row>
        </Grid>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Tracl;
