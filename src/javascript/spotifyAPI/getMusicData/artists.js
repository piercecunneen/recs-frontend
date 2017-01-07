var request = require('request');
var util = require('util');

/* eslint-disable max-len */
var createArtist = require('../../music/objects/create-music-objects.js').createArtist;
var createTrack = require('../../music/objects/create-music-objects.js').createTrack;
/* eslint-enable max-len */

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

function getArtistTopTracks(artistID, callback) {
  var countryCode=  "ES";
  var baseURL = 'https://api.spotify.com/v1/artists';
  var fullURI = util.format(
    '%s/%s/top-tracks?country=%s',
    baseURL,
    artistID,
    countryCode
  );
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
      var tracks = [];
      var tracksJsonData = JSON.parse(body);

      for (var i = 0; i < tracksJsonData['tracks'].length; i++) {
        var artist = createTrack(tracksJsonData['tracks'][i]);
        tracks.push(artist);
      }
      callback(null, tracks);
    }
  );
}

module.exports = {
  getArtists:         getArtists,
  getArtistTopTracks: getArtistTopTracks
};

