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
var api = require('../../api');

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
      'numRecommendations': 0,
      'numFavorites': 0,
      'track_id_recs': {},
      'track_id_favs': {}

    };
  },

  getAlbumData: function getAlbumData() {
    music.getAlbums([this.props.params.albumID], function(err, albums) {
      if (! err && albums.length == 1) {
        this.getRecsAndFavs(albums[0]);
      }
    }.bind(this));

  },

  getRecsAndFavs: function getRecsAndFavs(album) {
    var tracks = album.tracks;
    var track_ids = tracks.map(function(track){
      return track.id;
    }, []);
    var request_body = {
      'album_id': this.props.params.albumID,
      'track_ids':  track_ids
    };
    api.get_album_fav_data(request_body, function(err, httpResponse, body) {
      if (!err) {
        this.setState({
          'numFavorites': body[album.id] && body[album.id].count || 0,
          'track_id_favs': body
        });
      }
    }.bind(this));

    api.get_album_rec_data(request_body, function(err, httpResponse, body) {
      if (!err) {
        this.setState({
          'numRecommendations': body[album.id] && body[album.id].count || 0,
          'track_id_recs': body
        });
      }
    }.bind(this));
    this.setState({
      'album': album
    });

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
              <th># of Favorites </th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.album.tracks.map(function(item, i) {
                var track_favs = this.state.track_id_favs;
                var numFavs = track_favs[item.id] && track_favs[item.id].count || 0;
                var track_recs = this.state.track_id_recs;
                var numRecs = track_recs[item.id] && track_recs[item.id].count || 0;
                return (<Track num_favs={numFavs} num_recs={numRecs} track={item} key={i} selected={selectedTrack === item.id}  > </Track>);
              }.bind(this))
            }
          </tbody>
        </Table>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Album;
