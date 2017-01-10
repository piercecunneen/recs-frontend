'use strict';

var React = require('react');

var Track = require('../music/track-fav-item.js');
var Artist = require('../music/artist-rec-item.js');

var login = require('../../login');

var ProfileFav = React.createClass({
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
                    fav_item={fav_item}
                    user_friends = {this.props.friends.data || []}
                    user_id={login.getLoggedInID()}
                    selected={false}>
                  </Track>
                );
              } else if (fav_item.item_data.type === "artist") {
                item = (
                  <Artist
                    fav_item={fav_item}
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

module.exports = ProfileFav;