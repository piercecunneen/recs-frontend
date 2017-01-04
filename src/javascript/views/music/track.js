'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Image = require('react-bootstrap/lib/Image.js');

var login = require('../../login');
var music = require('../../spotifyAPI/getMusicData');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      track: {
        'title': '',
        album: {
          'title': '',
          albumImages: [
            {
              url: ''
            }
          ]
        }
      },
      trackID: this.props.params.trackID

    };
  },

  getTrackData: function getTrackData() {
    music.getTracks([this.state.trackID], function(err, tracks) {
      if (! err && tracks.length == 1) {
        this.setState({
          track: tracks[0]
        });
      }
    }.bind(this));
  },

  componentDidMount: function componentDidMount() {
    this.getTrackData();
  },

  render: function render() {
    /* eslint-disable max-len */
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col xsOffset={1} xs={5} >
              <h3> Track: {this.state.track.title} </h3>
            </Col>
            <Col xsOffset={1} xs={5} >
              <h3> Album: {this.state.track.album.title} </h3>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xsOffset={1} xs={5} >
            </Col>
            <Col xsOffset={1} xs={5} >
              <Image style={{height: 250, width: 250}} src={this.state.track.album.albumImages[0].url} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
