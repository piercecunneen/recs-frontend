'use strict';

var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup.js');

var TrackPanel = require('./track-panel-item.js');

var Track = React.createClass({
  getInitialState: function getInitialState() {
    return {
      recRating: this.props.rec_item.rating
    };
  },

 badRating: function badRating() {
    this.setState({
      recRating: 1
    });
  },

  okRating: function okRating() {
    this.setState({
      recRating: 2
    });
  },

  greatRating: function greatRating() {
    this.setState({
      recRating: 3
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

    var ratingFooter = this.props.toUser ? (
      <ButtonGroup justified>
        <Button
          href="#"
          onClick={this.badRating}
          bsStyle={this.state.recRating === 1 ? "primary" : "default"}>
          Bad Recommendation
        </Button>
        <Button
          href="#"
          onClick={this.okRating}
          bsStyle={this.state.recRating === 2 ? "primary" : "default"}>
          Ok Recommendation
        </Button>
        <Button
          href="#"
          onClick={this.greatRating}
          bsStyle={this.state.recRating === 3 ? "primary" : "default"}>
          Great Recommendation
        </Button>
      </ButtonGroup>
    ) : '';

    return (
      <TrackPanel
        rec_item={this.props.rec_item}
        ratingFooter={ratingFooter}
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
