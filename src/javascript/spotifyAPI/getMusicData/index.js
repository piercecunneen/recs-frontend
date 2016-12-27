
var getTracks = require('./get-tracks.js');
var getArtists = require('./get-artists.js');
var albums = require('./get-albums.js');

module.exports = {
  getTracks: getTracks,
  getArtists: getArtists,
  getAlbums: albums.getAlbums,
  getArtistAlbums: albums.getArtistAlbums
};