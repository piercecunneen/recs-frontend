'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Image = require('react-bootstrap/lib/Image.js');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('./track.js');

var login = require('../../login');
var music = require('../../spotifyAPI/getMusicData');

var Album = React.createClass({
  getInitialState: function getInitialState() {
    return {
      'album': {
        'artists': [
          {
            'name': ''
          }
        ],
        'albumImages': [
          {
            'url': ''
          }
        ],
        'tracks': []
      },
      'numRecommendations': 0

    };
  },

  getAlbumData: function getAlbumData() {
    music.getAlbums([this.props.params.albumID], function(err, albums) {
      if (! err && albums.length == 1) {
        this.setState({
          album: albums[0]
        });
      }
    }.bind(this));
  },

  componentDidMount: function componentDidMount() {
    this.getAlbumData();
  },

  render: function render() {
    /* eslint-disable max-len */
    var selectedTrack = this.props.location.query['highlighted-track'];
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row>
            <Col>
              <Image style={{height: 250, width: 250, margin:"auto", display:"block" }} src={this.state.album.albumImages[0].url} rounded  responsive />
            </Col>
          </Row>
          <Row>
            <h5 style={{'text-align': 'center'}}> {this.state.album.title} by {this.state.album.artists[0].name} </h5>
          </Row>
          <Row>
            <h5 style={{'text-align': 'center'}}> # of recommendations: {this.state.numRecommendations}  </h5>
          </Row>
        </Grid>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
              <th># of Recommendations</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.album.tracks.map(function(item, i) {
                return (<Track track={item} key={i} selected={selectedTrack === item.id}  > </Track>);
              })
            }
          </tbody>
        </Table>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Album;
