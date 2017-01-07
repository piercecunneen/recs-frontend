
var Album = function (albumJsonObject, artists, tracks) {
  this.albumType = albumJsonObject.album_type;
  this.availableMarkets = albumJsonObject.available_markets;
  this.linkToSpotify = albumJsonObject.external_urls.spotify;
  this.detailedInfoLink = albumJsonObject.href;
  this.id = albumJsonObject.id;
  this.images = albumJsonObject.images;
  this.title = albumJsonObject.name;
  this.genres = albumJsonObject.genres;
  this.popularity = albumJsonObject.popularity;
  this.releaseDate = albumJsonObject.release_date;
  this.artists = artists;
  this.tracks = tracks;
};

module.exports = Album;
