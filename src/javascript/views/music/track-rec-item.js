'use strict';

var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup.js');
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');


var TrackPanel = require('./track-panel-item.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      recRating: this.props.rec_item.rating
    };
  },

 thumbsDown: function thumbsDown() {
    this.setState({
      recRating: 1
    });
  },

  thumbsUp: function thumbsUp() {
    this.setState({
      recRating: 2
    });
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
        <Col xs={6} sm={6} md={9} lg={9}>
          Track
        </Col>
        <Col xs={6} sm={6} md={3} lg={3}>
          {this.props.toUser ?
            "Sent by: ".concat(friendName)  :
            "Sent to: ".concat(friendName)
         }
        </Col>
      </Row>
    );

    var footer = this.props.toUser ? (
      <div style={{"textAlign": "center"}}>
        Feedback?
        <ButtonGroup justified>
          <Button
            href="#"
            onClick={this.thumbsDown}
            bsStyle={this.state.recRating === 1 ? "danger" : "default"}>
           <Glyphicon glyph="thumbs-down" />
          </Button>
          <Button
            href="#"
            onClick={this.thumbsUp}
            bsStyle={this.state.recRating === 2 ? "success" : "default"}>
           <Glyphicon glyph="thumbs-up" /> 
          </Button>
        </ButtonGroup>
      </div>
    ) : '';

    return (
      <TrackPanel
        item={this.props.rec_item}
        footer={footer}
        header={header}
        index={this.props.index}
        user_friends = {this.props.user_friends}
        user_id={this.props.user_id}>
      </TrackPanel>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
