'use strict';

var React = require('react');
var Table = require('react-bootstrap/lib/Table.js');

var Track = require('../music/track-fav-item.js');

var login = require('../../login');

var ProfileRecs = React.createClass({
  getInitialState: function getInitialState() {
    return {
    };
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
          this.props.favorites.map(function(fav_item) {
            return (
                <Track
                  id={fav_item.item_id}
                  user_friends = {this.props.friends}
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