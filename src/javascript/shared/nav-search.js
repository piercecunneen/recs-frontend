'use strict';
var spotifySearch = require("../spotifyAPI/search");

var spotifyLib = require('../spotifyAPI/lib');

function navSearch(searchQuery, callback) {
  spotifySearch.generalSearch(searchQuery, function(err, response) {
    if (! err) {
      var artists = response.artists.items;
      var tracks = response.tracks.items;
      var items = artists.concat(tracks);
      callback(null, spotifyLib.rank.rankByPopularity(items));
    } else {
      callback(err);
    }
  });
}

module.exports = {
  navSearch: navSearch
};