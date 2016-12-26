var React = require('react');

var ProfileRequests = require('./profile-requests.js');
var ProfileRecs = require('./profile-recs.js');
var ProfileFavorites = require('./profile-favorites.js');

var ProfileMainContent = React.createClass({
  getInitialState: function getInitialState() {
    return {
      feed_mappings: {
        "profile":  ProfileRequests,
        "recs":      ProfileRecs,
        "favorites": ProfileFavorites
      }
    };
  },

  render: function render() {
    /* eslint-disable max-len*/
    var Component = this.state.feed_mappings[this.props.feed];
    return (
       <Component> </Component>
    );
  /* eslint-enable max-len*/
  }
});

module.exports = ProfileMainContent;