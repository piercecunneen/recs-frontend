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

    var friendName;
    for (var i = 0; i < this.props.user_friends.length; i++) {
      var friend = this.props.user_friends[i];
      if (Number(friend.id) === this.props.friend_id) {
        friendName = friend.name;
        break;
      }
    }

    var header = (
      <Row>
        <Col xs={9} sm={9} md={9} lg={9}>
          Track
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          {this.props.toUser ?
            "Sent by: ".concat(friendName)  :
            "Sent to: ".concat(friendName)
         }
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
