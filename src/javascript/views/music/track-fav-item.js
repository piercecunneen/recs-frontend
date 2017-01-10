'use strict';

var React = require('react');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var TrackPanel = require('./track-panel-item.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      recRating: this.props.fav_item
    };
  },
  render: function render() {

    var header = (
      <Row>
        <Col xs={9} sm={9} md={9} lg={9}>
          Track
        </Col>
      </Row>
    );


    return (
      <TrackPanel
        item={this.props.fav_item}
        header={header}
        footer={""}
        index={this.props.index}
        user_friends = {this.props.user_friends}
        user_id={this.props.user_id}>
      </TrackPanel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
