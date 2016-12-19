'use strict';

var request = require('request');
var util = require('util');

var formatSearchString = require('../lib/formatSearchString.js');

var createMusicObjects = require('../../music/objects/createObjects.js');
var createAlbum = createMusicObjects.createAlbum;
var createTrack = createMusicObjects.createTrack;
var createArtist = createMusicObjects.createArtist;

function searchForArtist(artistName, offset, limit, callback) {
  /*
  Inputs:
    artistName
      type: string
    offset:
      type: int
      description: Spotify API lets you offset your search by some number
        this allows you to search for items in smaller groups and using the offset
        value on each individual search to get progress through the search results in
        smaller increments
    limit:
      type: int
      description: the maximum number of spotify items to be returned by a search

  */
  var baseURL = 'https://api.spotify.com/v1';
  var formatedArtistName = formatSearchString(artistName);
  var fullURI = util.format(
    '%s/search?q=%s&offset=%s&limit=%s&type=artist',
    baseURL,
    formatedArtistName,
    offset,
    limit
  );

  request({
    uri: fullURI,
    method: 'GET'
  },
    function(error, response, body) {
      if (error) {
        callback(error);
      }
      var artistInfo = JSON.parse(body);
      var artists = artistInfo['artists']['items'].map(createArtist);
      callback(null, artists);
    }
  );
}

function searchForTrack(trackName, offset, limit, callback) {
  /*
  Inputs:
    artistName
      type: string
    offset:
      type: int
      description: Spotify API lets you offset your search by some number
        this allows you to search for items in smaller groups and using the offset
        value on each individual search to get progress through the search results in
        smaller increments
    limit:
      type: int
      description: the maximum number of spotify items to be returned by a search

  */
  var baseURL = 'https://api.spotify.com/v1';
  var formatedTrackName = formatSearchString(trackName);
  var fullURI = util.format(
    '%s/search?q=%s&offset=%s&limit=%s&type=track',
    baseURL,
    formatedTrackName,
    offset,
    limit
  );

  request({
    uri: fullURI,
    method: 'GET'
  },
    function(error, response, body) {
      if (error) {
        callback(error);
      }
      var trackInfo = JSON.parse(body);
      var tracks = trackInfo['tracks']['items'].map(createTrack);
      callback(null, tracks);
    }
  );
}

function searchForAlbum(albumName, offset, limit, callback) {
  /*
  Inputs:
    artistName
      type: string
    offset:
      type: int
      description: Spotify API lets you offset your search by some number
        this allows you to search for items in smaller groups and using the offset
        value on each individual search to get progress through the search results in
        smaller increments
    limit:
      type: int
      description: the maximum number of spotify items to be returned by a search

  */
  var baseURL = 'https://api.spotify.com/v1';
  var formatedAlbumName = formatSearchString(albumName);
  var fullURI = util.format(
    '%s/search?q=%s&offset=%s&limit=%s&type=album',
    baseURL,
    formatedAlbumName,
    offset,
    limit
  );

  request({
    uri: fullURI,
    method: 'GET'
  },
    function(error, response, body) {
      if (error) {
        callback(error);
      }
      var albumInfo = JSON.parse(body);
      var albums = albumInfo['albums']['items'].map(createAlbum);
      callback(null, albums);
    }
  );
}

module.exports = {
  searchForArtist: searchForArtist,
  searchForTrack: searchForTrack,
  searchForAlbum: searchForAlbum
};
