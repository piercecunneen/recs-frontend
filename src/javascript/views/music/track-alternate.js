'use strict';

var React = require('react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var Button = require('react-bootstrap/lib/Button.js');

/* eslint-disable max-len */
var MakeRecommendationModal = require('../recommendations/make-recommendation.js');
/* eslint-enable max-len */

var Track = React.createClass({
  getInitialState: function getInitialState() {
    /* eslint-disable no-undef */
    var audio = new Audio();
    /* eslint-enable no-undef */
    audio.src = this.props.track.previewURL;
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false,
      isFavorite: true,
      changeFavTotal: false,
      numFavs: 0
    };
  },

  handleTrackEnd: function handleTrackEnd() {
    this.setState({
      isPlaying: false
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var fav_data = nextProps.fav_data || [];
    var isFavorited = fav_data.reduce(function(prev, next) {
      return prev || next.user_id ==  this.props.user_id;
    }.bind(this), false);
    if (isFavorited) {
      this.setState({
        isFavorite: true
      });
    }
  },

  playSong: function playSong() {
    if (this.state.audio.paused) {
      this.state.audio.play();
      this.setState({
        isPlaying: true
      });
    } else {
      this.state.audio.pause();
      this.setState({
        isPlaying: false
      });
    }
  },

  favorite: function favorite() {
    this.setState({
      isFavorite: true
    });
  },

  unFavorite: function unFavorite() {
    this.setState({
      isFavorite: false
    });
  },

  render: function render() {
    /* eslint-disable max-len */
    var track = this.props.track;
    var color = this.props.selected ? '#d3d3d3' : '#ffffff';

    var artists = track.artists.map(function (artist) {
      return {
        'name':             artist.name,
        'id':               artist.id,
        'detailedInfoLink': artist.detailedInfoLink
      };
    }, []);

    var album = {};
    if (track.album) {
      album = {
        'title':            track.album.title,
        'imageURL':         track.album.images &&  track.album.images[0].url,
        'detailedInfoLink': track.album.detailedInfoLink,
        'id':               track.album.id
      };
    }

    var track_data = {
      'type':       'track',
      'title':      track.title,
      'infoLink':   track.detailedInfoLink,
      'previewURL': track.previewURL,
      'popularity': track.popularity,
      'album':      album,
      'artists':    artists
    };
    return (
      <tr style = {{"backgroundColor": color}}>
        <td> {track.title} </td>
        <td> {track.artists && track.artists[0].name} </td>
        <td> {track.album && track.album.title} </td>
        <td> <Button onClick={this.playSong}> <Glyphicon glyph={this.state.isPlaying ? "pause" : "play"} /> </Button> </td>
        <td>
          <MakeRecommendationModal
            item_id={this.props.id}
            item_data={track_data}
            user_friends = {this.props.user_friends}
            item={track}>
          </MakeRecommendationModal>
        </td>
        <td>
          <Glyphicon
            onClick={this.state.isFavorite ? this.unFavorite : this.favorite}
            glyph={this.state.isFavorite ? "heart" : "heart-empty"}
            style={{"fontSize":"1.5em"}} />
        </td>
      </tr>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
