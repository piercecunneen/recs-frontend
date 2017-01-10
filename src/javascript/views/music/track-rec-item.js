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
    audio.src = this.props.track.previewURL;
    audio.preload = "none";
    audio.addEventListener('ended', this.handleTrackEnd);
    return {
      "audio": audio,
      isPlaying: false,
      isFavorite: true,
      changeFavTotal: false,
      numFavs: 0
    };
  },

  handleTrackEnd: function handleTrackEnd() {
    this.setState({
      isPlaying: false
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var fav_data = nextProps.fav_data || [];
    var isFavorited = fav_data.reduce(function(prev, next) {
      return prev || next.user_id ==  this.props.user_id;
    }.bind(this), false);
    if (isFavorited) {
      this.setState({
        isFavorite: true
      });
    }
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

  favorite: function favorite() {
    this.setState({
      isFavorite: true
    });
  },

  unFavorite: function unFavorite() {
    this.setState({
      isFavorite: false
    });
  },

  render: function render() {
    /* eslint-disable max-len */
    var track = this.props.track;

    var artists = track && track.artists || [];
    artists = artists.map(function (artist) {
      return {
        'name':             artist.name,
        'id':               artist.id,
        'detailedInfoLink': artist.detailedInfoLink
      };
    }, []);

    // var album = {};
    // if (track.album) {
    //   album = {
    //     'title':            track.album.title,
    //     'imageURL':         track.album.images &&  track.album.images[0].url,
    //     'detailedInfoLink': track.album.detailedInfoLink,
    //     'id':               track.album.id
    //   };
    // }

    // var track_data = {
    //   'type':       'track',
    //   'title':      track.title,
    //   'infoLink':   track.detailedInfoLink,
    //   'previewURL': track.previewURL,
    //   'popularity': track.popularity,
    //   'album':      album,
    //   'artists':    artists
    // };

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
          <Image
                style={{height: 150, width: 150, 'margin': 'auto', 'display': 'block'}}
                src={track.album.imageURL}
                rounded
                responsive/>
            <div style={{'textAlign': 'center'}}>
              <h4 style={{'display': 'inline'}}>Title:</h4> {track.title}
            </div>
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
              <h4 style={{'display': 'inline'}}>Album:</h4> {track.album && track.album.title}
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

    // return (
    //   <tr style = {{"backgroundColor": color}}>
    //     <td> {track.title} </td>
    //     <td> {track.artists && track.artists[0].name} </td>
    //     <td> {track.album && track.album.title} </td>
    //     <td> <Button onClick={this.playSong}> <Glyphicon glyph={this.state.isPlaying ? "pause" : "play"} /> </Button> </td>
    //     <td>
    //       <MakeRecommendationModal
    //         item_id={this.props.id}
    //         item_data={track_data}
    //         user_friends = {this.props.user_friends}
    //         item={track}>
    //       </MakeRecommendationModal>
    //     </td>
    //     <td>
    //       <Glyphicon
    //         onClick={this.state.isFavorite ? this.unFavorite : this.favorite}
    //         glyph={this.state.isFavorite ? "heart" : "heart-empty"}
    //         style={{"fontSize":"1.5em"}} />
    //     </td>
    //   </tr>
    // );
    /* eslint-enable max-len */
  }
});

module.exports = Track;
