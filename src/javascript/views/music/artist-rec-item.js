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
          Artist
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          {this.props.toUser ?
            "Sent by: ".concat(friendName)  :
            "Sent to: ".concat(friendName)
         }
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
