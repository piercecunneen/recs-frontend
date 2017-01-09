'use strict';

var Track = require('./Track/Track.js');
var Album = require('./Album/Album.js');
var Artist = require('./Artist/Artist.js');

function createTrack(trackJsonData, album) {
  /*
  Creates a Track Object from a json blob provided via Spotify API
  Input:
    trackJsonData
      type: Json object
      description: a track object from the Spotify API
  returns:
    A Track object (see Track/Track.js for more details)
  */
  var artists = [];
  var albumCopy = {

  };

  for (var i = 0; i < trackJsonData['artists'].length; i++) {
    var artist = new Artist(trackJsonData['artists'][i]);
    artists.push(artist);
  }
  if (trackJsonData['album'] !== undefined) {
    album = createAlbum(trackJsonData['album']);
  }

  for (var prop in album) {
    if (album.hasOwnProperty(prop)) {
        albumCopy[prop] = album[prop];
    }
  }

  return new Track(trackJsonData, albumCopy, artists);
}

function createAlbum(albumJsonData) {
  /*
  Creates an album Object from a json blob provided via Spotify API
  Input:
    albumJsonData
      type: Json object
      description: an album object from the Spotify API
  returns:
    An Album object (see Album/Album.js for more details)
  */
  var album = new Album(albumJsonData, [], []);
  var tracks = [];
  var artists = [];
  var i;
  if (albumJsonData['artists'] !== undefined) {
    for (i = 0; i < albumJsonData['artists'].length; i++) {
      var artist = new Artist(albumJsonData['artists'][i]);
      artists.push(artist);
    }
  }

  if (albumJsonData['tracks'] !== undefined) {
    var tracksData = albumJsonData['tracks']['items'];
    for (i = 0; i < tracksData.length; i++) {
      var track = createTrack(tracksData[i], album);
      tracks.push(track);
    }
  }
  album.artists = artists;
  album.tracks = tracks;
  return album;
}

function createArtist(artistJsonData) {
  /*
  Creates an artist Object from a json blob provided via Spotify API
  Input:
    artistJsonData
      type: Json object
      description: an artist object from the Spotify API
  returns:
    An Artist object (see Artist/Track.js for more details)
  */
  return new Artist(artistJsonData);
}

module.exports = {
  createArtist: createArtist,
  createTrack: createTrack,
  createAlbum: createAlbum
};
