'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Image = require('react-bootstrap/lib/Image.js');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('./track.js');
/* eslint-disable max-len */
var MakeRecommendationModal = require('../recommendations/make-recommendation.js');
/* eslint-enable max-len */

var login = require('../../login');

var Album = React.createClass({
  getInitialState: function getInitialState() {
    return {
      'album': {
        'artists': [
          {
            'name': ''
          }
        ],
        'images': [
          {
            'url': ''
          }
        ],
        'tracks': []
      }

    };
  },


  componentDidMount: function componentDidMount() {
    // this.getAlbumData();
  },

  render: function render() {
    /* eslint-disable max-len */
    var album = this.props.album;
    var artists = album.artists.map(function (artist) {
      return {
        'name':             artist.name,
        'id':               artist.id,
        'detailedInfoLink': artist.detailedInfoLink
      };
    }, []);

    var album_data = {
      'type':       'album',
      'title':      album.title,
      'infoLink':   album.detailedInfoLink,
      'popularity': album.popularity,
      'artists':    artists,
      'imageURL':   album.images[0].url
    };

    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <Image style={{height: 250, width: 250, margin:"auto", display:"block" }} src={this.props.album.images[0].url} rounded  responsive />
            </Col>
          </Row>
          <Row>
            <h5 style={{'textAlign': 'center'}}> {this.props.album.title} by {this.props.album.artists[0].name} </h5>
          </Row>
          <Row>
            <h5 style={{'textAlign': 'center'}}> # of recommendations: {this.props.numRecs}  </h5>
          </Row>
          <Row>
            <MakeRecommendationModal
                item_id={album.id}
                item_data={album_data}
                user_friends = {this.props.user_friends}
                item={album}>
              </MakeRecommendationModal>
            </Row>
        </Grid>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
              <th># of Recommendations</th>
              <th># of Favorites </th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.album.tracks.map(function(item, i) {
                var numFavs = this.props.fav_data[item.id] && this.props.fav_data[item.id].count || 0;
                var numRecs = this.props.rec_data[item.id] && this.props.rec_data[item.id].count || 0;
                return (
                  <Track
                    id={item.id}
                    user_friends={this.props.user_friends}
                    fav_data={this.props.fav_data[item.id] && this.props.fav_data[item.id].items || []}
                    num_favs={numFavs}
                    num_recs={numRecs}
                    track={item}
                    key={i}
                    user_id={login.getLoggedInID()}
                    selected={false}
                  > </Track>
                );
              }.bind(this))
            }
          </tbody>
        </Table>
      </div>
    );
    /* eslint-enable max-len */
  }
});

module.exports = Album;
