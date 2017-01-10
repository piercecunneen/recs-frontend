'use strict';

var React = require('react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var Button = require('react-bootstrap/lib/Button.js');
var Panel = require('react-bootstrap/lib/Panel.js');
var Image = require('react-bootstrap/lib/Image.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    /* eslint-disable no-undef */
    var audio = new Audio();
    /* eslint-enable no-undef */
    audio.src = this.props.rec_item.item_data.previewURL;
    audio.preload = "none";
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false,
      isFavorite: true,
      changeFavTotal: false,
      numFavs: 0,
      recRating: -1
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
    var track = this.props.rec_item.item_data;

    var artists = track && track.artists || [];
    artists = artists.map(function (artist) {
      return {
        'name':             artist.name,
        'id':               artist.id,
        'detailedInfoLink': artist.detailedInfoLink
      };
    }, []);

    // var album = {};
    // if (track.album) {
    //   album = {
    //     'title':            track.album.title,
    //     'imageURL':         track.album.images &&  track.album.images[0].url,
    //     'detailedInfoLink': track.album.detailedInfoLink,
    //     'id':               track.album.id
    //   };
    // }

    // var track_data = {
    //   'type':       'track',
    //   'title':      track.title,
    //   'infoLink':   track.detailedInfoLink,
    //   'previewURL': track.previewURL,
    //   'popularity': track.popularity,
    //   'album':      album,
    //   'artists':    artists
    // };

    return (
      <Panel header={this.props.header} footer={this.props.ratingFooter}>
        <Row>
          <Col>
          <div style={{'textAlign': 'center'}}>
              <h2 style={{'display': 'inline'}}> {track.title} </h2>
            </div>
          <Image
                style={{height: 150, width: 150, 'margin': 'auto', 'display': 'block'}}
                src={track.album.imageURL}
                rounded
                responsive/>
            <div style={{'textAlign': 'center'}}>
              <h4 style={{'display': 'inline'}}>Artist:</h4>
              {
                track.artists.map(function(artist, index) {
                  var link;
                  if (index > 0) {
                     link = (<a href={"/artist/".concat(artist.id)}>, {artist.name} </a>);
                  } else {
                     link = (<a href={"/artist/".concat(artist.id)}> {artist.name} </a>);
                  }
                  return link;
                })
              }
            <div style={{'textAlign': 'center'}}>
              <h4 style={{'display': 'inline'}}>Album:</h4>  <a href={'/album/'.concat(track.album && track.album.id)}> {track.album && track.album.title} </a>
            </div>
            </div>
             <div>
              <Button
                style={{'margin': 'auto', 'display': 'block'}}
                onClick={this.playSong}>
                Preview <Glyphicon glyph={this.state.isPlaying ? "pause" : "play"} />
              </Button>
            </div>
          </Col>
        </Row>
      </Panel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
