'use strict';

var React = require('react');
var Grid = require('react-bootstrap/lib/Grid.js');
var Row = require('react-bootstrap/lib/Row.js');
var Col = require('react-bootstrap/lib/Col.js');

var Image = require('react-bootstrap/lib/Image.js');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('./track.js');

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
            <h5 style={{'textAlign': 'center'}}> # of recommendations: {this.state.numRecommendations}  </h5>
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
                    user_friends={this.props.user_friends}
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
