'use strict';

var React = require('react');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var Button = require('react-bootstrap/lib/Button.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    /* eslint-disable no-undef */
    var audio = new Audio();
    /* eslint-enable no-undef */
    audio.src = this.props.track.previewURL;
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false
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

  recommend: function recommend() {
    var makeRecString = "/recs/make-recommendation?itemType=track";
    makeRecString= makeRecString.concat(
      "&itemID=",
      this.state.trackID,
      "&itemName=",
      this.props.track.title
    );
    window.location.href = makeRecString;
  },
  render: function render() {
    /* eslint-disable max-len */
    var track = this.props.track;
    var milliseconds = track.duration;
    var seconds = Math.floor((milliseconds / 1000) % 60);
    var modifiedSeconds =  seconds <= 9 ? "0" + seconds.toString() : seconds.toString();
    var minutes = Math.floor(((milliseconds / (1000*60)) % 60));
    var color = this.props.selected ? '#d3d3d3' : '#ffffff';
    var numRecs = 0;
    return (
      <tr style = {{"backgroundColor": color}}>
        <td> {track.trackNumber} </td>
        <td> {track.title} </td>
        <td> {minutes}:{modifiedSeconds} </td>
        <td> {numRecs} </td>
        <td> <Button onClick={this.playSong}> <Glyphicon glyph={this.state.isPlaying ? "pause" : "play"} /> </Button> </td>
        <td> <Button onClick={this.recommend} bsStyle="success"> Recommend to a friend! <Glyphicon glyph="send" /> </Button> </td>
      </tr>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
