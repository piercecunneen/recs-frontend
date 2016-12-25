'use strict';
var spotifySearch = require("../spotifyAPI/search/search.js");
var rankByPopularity = require('../spotifyAPI/lib/rank.js').rankByPopularity;

function navSearch(searchQuery, callback) {
  spotifySearch.generalSearch(searchQuery, function(err, response) {
    if (! err) {
      var artists = response.artists.items;
      var tracks = response.tracks.items;
      var items = artists.concat(tracks);
      callback(null, rankByPopularity(items));
    } else {
      callback(err);
    }
  });
}

module.exports = {
  navSearch: navSearch
};