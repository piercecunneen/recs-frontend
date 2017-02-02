'use strict';

var React = require('react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var Button = require('react-bootstrap/lib/Button.js');
/* eslint-disable max-len */
var MakeRecommendationModal = require('../recommendations/make-recommendation.js');
/* eslint-enable max-len */
var api = require('../../api');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    /* eslint-disable no-undef */
    var audio = new Audio();
    /* eslint-enable no-undef */
    audio.preload="none";
    audio.src = this.props.track.previewURL;
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false,
      isFavorite: false,
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
    var track = this.props.track;

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
      'artists':    artists,
      'album':      album
    };
    var request_body = {
      'item_id':    this.props.id,
      'item_type':  'track',
      'user_id':    Number(this.props.user_id),
      'item_data': track_data

    };

    api.add_favorite(request_body, function() {

    });
    this.setState({
      isFavorite: true,
      changeFavTotal: true,
      numFavs: this.state.numFavs &&
        this.state.numFavs+1 ||
        this.props.num_favs + 1
    });
  },

  unFavorite: function unFavorite() {
    var newFavTotal = this.state.numFavs &&
      this.state.numFavs-1 ||
      this.props.num_favs - 1;
    if (newFavTotal < 0) {
      newFavTotal = 0;
    }

    var request_body = {
      'item_id':    this.props.id,
      'item_type':  0,
      'user_id':    Number(this.props.user_id)
    };
    api.remove_favorite(request_body, function() {
    });

    this.setState({
      isFavorite: false,
      changeFavTotal: true,
      numFavs: newFavTotal
    });
  },

  render: function render() {
    /* eslint-disable max-len */
    var track = this.props.track;
    var milliseconds = track.duration;
    var seconds = Math.floor((milliseconds / 1000) % 60);
    var modifiedSeconds =  seconds <= 9 ? "0" + seconds.toString() : seconds.toString();
    var minutes = Math.floor(((milliseconds / (1000*60)) % 60));
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
        <td> {track.trackNumber} </td>
        <td> {track.title} </td>
        <td> {minutes}:{modifiedSeconds} </td>
        <td> {this.props.num_recs} </td>
        <td> {this.state.numFavs || this.props.num_favs} </td>
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
            glyph={this.state.isFavorite ? "star" : "star-empty"}
            style={{"fontSize":"1.5em"}} />
        </td>
      </tr>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
