'use strict';

var React = require('react');
var Panel = require('react-bootstrap/lib/Panel.js');
var Image = require('react-bootstrap/lib/Image.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      recRating: -1
    };
  },

  render: function render() {
    /* eslint-disable max-len */
    var album = this.props.item.item_data;

    return (
      <Panel header={this.props.header} footer={this.props.footer}>
        <Row>
          <Col>
            <div style={{'textAlign': 'center'}}>
              <h2 style={{'display': 'inline'}}>
                <a href={'/album/'.concat(this.props.item && this.props.item.item_id)}> {album.title} </a>
              </h2>
            </div>
          <Image
                style={{height: 150, width: 150, 'margin': 'auto', 'display': 'block'}}
                src={album.imageURL}
                rounded
                responsive/>
            <div style={{'textAlign': 'center'}}>
              <h4 style={{'display': 'inline'}}>Artist:</h4>
              {
                album.artists.map(function(artist, index) {
                  var link;
                  if (index > 0) {
                     link = (<a href={"/artist/".concat(artist.id)}>, {artist.name} </a>);
                  } else {
                     link = (<a href={"/artist/".concat(artist.id)}> {artist.name} </a>);
                  }
                  return link;
                })
              }
            </div>
          </Col>
        </Row>
      </Panel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
