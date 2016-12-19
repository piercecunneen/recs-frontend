'use strict';

var Artist = function (artistJsonObject) {
  this.id = artistJsonObject.id;
  this.name = artistJsonObject.name;
  this.detailedInfoLink = artistJsonObject.href;
  this.linkToSpotify = artistJsonObject.external_urls && 
    artistJsonObject.external_urls.spotify;

  this.genres = artistJsonObject.genres;
  this.popularity = artistJsonObject.popularity;
  this.images = artistJsonObject.images;

  if (artistJsonObject['followers']) {
    this.numFollowers = artistJsonObject.followers.total;
  }
};

module.exports = Artist;
