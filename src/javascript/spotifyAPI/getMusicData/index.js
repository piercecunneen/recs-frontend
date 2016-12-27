
var getTracks = require('./tracks.js');
var getArtists = require('./artists.js');
var albums = require('./albums.js');

module.exports = {
  getTracks: getTracks,
  getArtists: getArtists,
  getAlbums: albums.getAlbums,
  getArtistAlbums: albums.getArtistAlbums
};
