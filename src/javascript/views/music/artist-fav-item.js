'use strict';

var React = require('react');
var Panel = require('react-bootstrap/lib/Panel.js');
var Row = require('react-bootstrap/lib/Row.js');
var Image = require('react-bootstrap/lib/Image.js');
var Col = require('react-bootstrap/lib/Col.js');



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
    var artistImage = this.props.artist.imageURL;

    var header = (
      <Row>
        <Col xs={9} sm={9} md={9} lg={9}>
          Artist
        </Col>
      </Row>
    );
    return (
      <Panel header={header}>
        <Row>
          <Col>
           <div style={{'textAlign': 'center'}}>
              <h2 style={{'display': 'inline'}}>
                <a href={artistLink}>{this.props.artist.name} </a>
              </h2>
            </div>
            <Image
                  style={{height: 150, width: 150, 'margin': 'auto', 'display': 'block'}}
                  src={artistImage}
                  rounded
                  responsive/>
          </Col>
        </Row>
      </Panel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = ArtistItem;
