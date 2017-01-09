'use strict';

var React = require('react');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('../music/track-alternate.js');

var api = require('../../api');
var login = require('../../login');
var FaceBook = require('../../FB');

var ProfileRecs = React.createClass({
  getInitialState: function getInitialState() {
    return {
      test: 'test state to see if routing works',
      favorites: [],
      friends: []
    };
  },



  componentDidMount: function componentDidMount() {
    api.get_user_favorites(
      login.getLoggedInID(),
      function(err, body) {
        if (!err) {
          this.setState({
            favorites: body.favorites
          });
        }
      }.bind(this)
    );
    FaceBook.getUserFriends(
      login.getAuthToken(),
      function (err, friends) {
        this.setState({
          user_friends: friends
        });
      }.bind(this)
    );
  },

  render: function render() {
    /* eslint-disable max-len*/
    return (
       <div>
        <Table>
          <thead>
            <tr>
              <th> Title </th>
              <th> Artist </th>
              <th> Album </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
        {
          this.state.favorites.map(function(fav_item) {
            return (
                <Track
                  id={fav_item.item_id}
                  user_friends = {this.state.user_friends}
                  num_favs={0}
                  fav_data={[]} num_recs={0}
                  track={fav_item.item_data}
                  user_id={login.getLoggedInID()}
                  selected={false}>
                </Track>
            );
          }.bind(this))
        }
        </tbody>
        </Table>
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileRecs;