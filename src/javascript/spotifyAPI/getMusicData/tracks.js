var request = require('request');
var util = require('util');

/* eslint-disable max-len */
var createTrack = require('../../music/objects/create-music-objects.js').createTrack;
/* eslint-enable max-len */

function getTracks(trackIDs, callback) {
  /*
    trackIDs:
      type: list of strings
      description: list of spotify track IDs

  */
  var baseURL = 'https://api.spotify.com/v1/tracks';
  var fullURI = util.format('%s/?ids=%s', baseURL, trackIDs.join(','));
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
      var tracksData = JSON.parse(body);

      for (var i = 0; i < tracksData['tracks'].length; i++) {
        var track = createTrack(tracksData['tracks'][i]);
        tracks.push(track);
      }
      callback(null, tracks);
    }
  );
}

module.exports = getTracks;
