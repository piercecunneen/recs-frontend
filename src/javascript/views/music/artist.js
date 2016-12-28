'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Image = require('react-bootstrap/lib/Image.js');

var login = require('../../login');
var music = require('../../spotifyAPI/getMusicData');

var Artist = React.createClass({
  getInitialState: function getInitialState() {
    return {
      artistID: this.props.routeParams.artistID,
      artist: {
        'name': '',
        'images': []
      }
    };
  },

  getArtistData: function getArtistData() {
    music.getArtists([this.state.artistID], function(err, artists) {
      if (! err && artists.length == 1) {
        this.setState({
          artist: artists[0]
        });
      }
    }.bind(this));
  },

  render: function render() {
    var url = '';
    if (this.state.artist.name == '') {
      this.getArtistData();
    }
    if (this.state.artist.images.length > 0) {
      url = this.state.artist.images[0].url;
    }
    /* eslint-disable max-len */
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col>
               <Image src={url} style={{height: 250, width: 250, display:"block", margin:"auto"}} circle responsive ß/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <h2 style={{"textAlign":"center", margin:"auto"}}> {this.state.artist.name} </h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Artist;
