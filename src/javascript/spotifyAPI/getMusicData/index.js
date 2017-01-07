
var getTracks = require('./tracks.js');
var artists = require('./artists.js');
var albums = require('./albums.js');

module.exports = {
  getTracks:             getTracks,
  getArtists:            artists.getArtists,
  getArtistTopTracks:    artists.getArtistTopTracks,
  getAlbums:             albums.getAlbums,
  getArtistAlbums:       albums.getArtistAlbums
};
