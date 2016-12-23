var request = require('request');
var util = require('util');

var createAlbum = require('../music/objects/createObjects.js').createAlbum;

function getAlbums(albumIDs, callback) {
  /*
    albumIDs:
      type: list of strings
      description: list of spotify album IDs

  */
  var baseURL = 'https://api.spotify.com/v1/albums';
  var fullURI = util.format('%s/?ids=%s', baseURL, albumIDs.join(','));
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
      var albums = [];
      var albumJsonData = JSON.parse(body);
      for (var i = 0; i < albumJsonData['albums'].length; i++) {
        var album = createAlbum(albumJsonData['albums'][i]);
        albums.push(album);
      }
      callback(null, albums);
    }
  );
}

function getArtistAlbums(artistID, callback) {
  /*
    Inputs:
      artistID
        type: string
        description: spotify artist uuid
  */
  var baseURL = 'https://api.spotify.com/v1/artists';
  var fullURI = util.format('%s/%s/albums', baseURL, artistID);
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
      var albums = [];
      var albumJsonData = JSON.parse(body)['items'];
      for (var i = 0; i < albumJsonData.length; i++) {
        var album = createAlbum(albumJsonData[i]);
        albums.push(album);
      }
      callback(null, albums);
    }
  );
}

module.exports = {
  getAlbums: getAlbums,
  getArtistAlbums: getArtistAlbums
};
