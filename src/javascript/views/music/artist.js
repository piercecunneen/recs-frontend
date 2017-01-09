'use strict';

var React = require('react');
var Navbar = require('../shared/navbar.js');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var Image = require('react-bootstrap/lib/Image.js');
var Table = require('react-bootstrap/lib/Table.js');


/* eslint-disable max-len */
var MakeRecommendationModal = require('../recommendations/make-recommendation.js');
var Track = require('./track.js');
var Album = require('./album-component.js');
/* eslint-enable max-len */

var login = require('../../login');
var music = require('../../spotifyAPI/getMusicData');
var FaceBook = require('../../FB');
var api = require('../../api');

var Artist = React.createClass({
  getInitialState: function getInitialState() {
    return {
      artistID: this.props.routeParams.artistID,
      artist: {
        'name': '',
        'images': []
      },
      'topTracks': [],
      'albums': [],
      'user_friends': []
    };
  },

  getTopTracks: function getTopTracks() {
    music.getArtistTopTracks(this.state.artistID, function(err, tracks) {
      if (!err) {
        this.setState({
          topTracks: tracks
        });
      }
    }.bind(this));
  },

  getArtistData: function getArtistData() {
    music.getArtists([this.state.artistID], function(err, artists) {
      if (! err && artists.length == 1) {
        this.setState({
          artist: artists[0]
        });
      }
    }.bind(this));

    this.getTopTracks();
    this.getAlbums();
  },

  getFullAlbums: function getFullAlbums(albumIDs) {
    music.getAlbums(albumIDs, function(err, albums) {
      this.getRecsAndFavs(albums);
      if (!err) {
        this.setState({
          'albums': albums
        });
      }
    }.bind(this));
  },

  getRecsAndFavs: function getRecsAndFavs(albums) {
    var request_body = {'albums': []};
    for (var i = 0; i < albums.length; i++) {
        var album = albums[i];
        var tracks = album.tracks;

        var track_ids = tracks.map(
          function(track){
            return track.id;
          },
          []
        );
        request_body.albums.push(
          {
            'album_id':  album.id,
            'track_ids':  track_ids
          }
        );
    }
    api.get_album_fav_data(request_body, function(err, body) {
      if (!err) {
        this.setState({
          'albums_favorite_data': body
        });
      }
    }.bind(this));

    api.get_album_rec_data(request_body, function(err, body) {
      if (!err) {
        this.setState({
          'albums_recommendation_data': body
        });
      }
    }.bind(this));
  },

  getAlbums: function getAlbums() {
    music.getArtistAlbums(this.state.artistID, function(err, albums) {
      var albumIDs = albums.map(function (item) {
        return item.id;
      }, []);
      this.getFullAlbums(albumIDs);
    }.bind(this));
  },

  componentDidMount: function componentDidMount() {
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
               <Image
                src={url}
                style={{height: 250, width: 250, display:"block", margin:"auto"}}
                circle
                responsive/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <h2 style={{"textAlign":"center", margin:"auto"}}> {this.state.artist.name} </h2>
            </Col>
          </Row>
          <Row className="show-grid">
              <MakeRecommendationModal
                user_friends={this.state.user_friends}
                item={this.state.artist}>
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
              this.state.topTracks.map(function(item, i) {
                return (
                  <Track
                    id={item.id}
                    num_favs={0}
                    user_friends={this.state.user_friends}
                    fav_data={[]} num_recs={0}
                    track={item}
                    key={i}
                    user_id={login.getLoggedInID()}
                    selected={false}
                  > </Track>
                );
              }.bind(this))
            }
          </tbody>
        </Table>
        {
          this.state.albums.map(function(album) {
          var rec_data = this.state['albums_recommendation_data'] &&
            this.state['albums_recommendation_data'][album.id] ||
            [];
          var fav_data = this.state['albums_favorite_data'] &&
            this.state['albums_favorite_data'][album.id] ||
            [];
            return (
              <Album
                user_friends={this.state.user_friends}
                rec_data={rec_data}
                fav_data={fav_data}
                album={album}> </Album>
            );
          }.bind(this))
        }
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Artist;
