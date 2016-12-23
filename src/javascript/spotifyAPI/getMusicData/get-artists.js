var request = require('request');
var util = require('util');

var createArtist = require('../music/objects/createObjects.js').createArtist;

function getArtists(artistIDs, callback) {
  /*
    artistIDs:
      type: list of strings
      description: list of spotify artist IDs

  */
  var baseURL = 'https://api.spotify.com/v1/artists';
  var fullURI = util.format('%s/?ids=%s', baseURL, artistIDs.join(','));
  request({
    uri: fullURI,
    method: 'GET'
  },
    function(error, response, body) {
      if (error) {
        callback(error);
      } else if (response.error) {
        callback(response);
      }
      var artists = [];
      var artistJsonData = JSON.parse(body);

      for (var i = 0; i < artistJsonData['artists'].length; i++) {
        var artist = createArtist(artistJsonData['artists'][i]);
        artists.push(artist);
      }
      callback(null, artists);
    }
  );
}

module.exports = {
  getArtists: getArtists
};
