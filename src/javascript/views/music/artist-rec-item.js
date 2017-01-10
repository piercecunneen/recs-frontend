'use strict';

var React = require('react');
var Panel = require('react-bootstrap/lib/Panel.js');


var ArtistItem = React.createClass({
  getInitialState: function getInitialState() {

    return {
    };
  },

  handleTrackEnd: function handleTrackEnd() {
    this.setState({
      isPlaying: false
    });
  },

  render: function render() {
    /* eslint-disable max-len */
    var artistLink = "/artist/".concat(this.props.artist.id);
    return (
      <Panel header="Artist">
        <div style={{'textAlign': 'center'}}>
          <h4 style={{'display': 'inline'}}>Artist:</h4>  <a href={artistLink}> {this.props.artist.name} </a>
        </div>
      </Panel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = ArtistItem;
