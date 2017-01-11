'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Image = require('react-bootstrap/lib/Image.js');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('./track.js');
/* eslint-disable max-len */
var MakeRecommendationModal = require('../recommendations/make-recommendation.js');
/* eslint-enable max-len */

var FaceBook = require('../../FB');
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
        'images': [
          {
            'url': ''
          }
        ],
        'tracks': []
      },
      'numRecommendations': 0,
      'numFavorites': 0,
      'track_id_recs': {},
      'track_id_favs': {},
      'user_friends': []

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
      'albums': [
        {
          'album_id':  album.id,
          'track_ids':  track_ids
        }
      ]
    };
    api.get_album_fav_data(request_body, function(err, body) {
      var data = body[album.id];
      if (!err) {
        this.setState({
          'numFavorites': data[album.id] && data[album.id].count || 0,
          'track_id_favs': data
        });
      }
    }.bind(this));

    api.get_album_rec_data(request_body, function(err, body) {
      var data = body[album.id];
      if (!err) {
        this.setState({
          'numRecommendations': data[album.id] && data[album.id].count || 0,
          'track_id_recs': data
        });
      }
    }.bind(this));
    this.setState({
      'album': album
    });

  },

  componentDidMount: function componentDidMount() {
    this.getAlbumData();
    FaceBook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        this.setState({
          user_friends: friends
        });
      }.bind(this)
    );

  },

  render: function render() {
    /* eslint-disable max-len */
    var selectedTrack = this.props.location.query['highlighted-track'];
    var album = this.state.album;
    var artists = album.artists.map(function (artist) {
      return {
        'name':             artist.name,
        'id':               artist.id,
        'detailedInfoLink': artist.detailedInfoLink
      };
    }, []);

    var album_data = {
      'type':       'album',
      'title':      album.title,
      'infoLink':   album.detailedInfoLink,
      'popularity': album.popularity,
      'artists':    artists,
      'imageURL':   album.images[0].url
    };
    return (
      <div>
        <Navbar isLoggedIn={login.getLoggedInID()}> </Navbar>
        <Grid>
          <Row>
            <Col>
              <Image
                style={{height: 250, width: 250, margin:"auto", display:"block" }}
                src={this.state.album.images[0].url}
                rounded
                responsive
              />
            </Col>
          </Row>
          <Row>
            <h5 style={{'textAlign': 'center'}}> {this.state.album.title} by {this.state.album.artists[0].name} </h5>
          </Row>
          <Row>
            <h5 style={{'textAlign': 'center'}}> # of recommendations: {this.state.numRecommendations}  </h5>
          </Row>
          <Row>
            <MakeRecommendationModal
              item_id={album.id}
              item_data={album_data}
              user_friends = {this.state.user_friends}
              item={album}>
            </MakeRecommendationModal>
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
                return (
                  <Track
                    user_friends = {this.state.user_friends}
                    num_favs={numFavs}
                    fav_data={track_favs[item.id] && track_favs[item.id].items || []}
                    num_recs={numRecs}
                    track={item}
                    key={i}
                    id={item.id}
                    user_id={login.getLoggedInID()}
                    selected={selectedTrack === item.id}>
                  </Track>
                );
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
