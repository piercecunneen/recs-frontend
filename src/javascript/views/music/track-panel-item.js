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
    audio.src = this.props.item.item_data.previewURL;
    audio.preload = "none";
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false,
      recRating: -1
    };
  },

  handleTrackEnd: function handleTrackEnd() {
    this.setState({
      isPlaying: false
    });
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

  render: function render() {
    /* eslint-disable max-len */
    var track = this.props.item.item_data;

    return (
      <Panel header={this.props.header} footer={this.props.footer}>
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
