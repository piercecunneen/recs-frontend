'use strict';

var React = require('react');

var Track = require('../music/track-fav-item.js');
var Artist = require('../music/artist-rec-item.js');

var login = require('../../login');

var ProfileRecs = React.createClass({
  getInitialState: function getInitialState() {
    return {
      favorites: [],
      friends: [],
      user_id: Number(login.getLoggedInID())
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    return (
       <div>
          {
            this.props.favorites.map(function(fav_item, index) {
              var item;
              if (fav_item.item_data.type === "track") {
                item = (
                  <Track
                    index={index}
                    id={fav_item.item_id}
                    user_friends = {this.props.friends.data || []}
                    num_favs={0}
                    fav_data={[]}
                    num_recs={0}
                    track={fav_item.item_data || {}}
                    user_id={login.getLoggedInID()}
                    selected={false}
                    rating={fav_item.rating}>
                  </Track>
                );
              } else if (fav_item.item_data.type === "artist") {
                item = (
                  <Artist
                    artist={fav_item.item_data}
                    user_friends = {this.props.friends.data || []}>
                  </Artist>
                );
              }
              return item;
            }.bind(this))
          }
      </div>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileRecs;