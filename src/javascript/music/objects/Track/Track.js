var Track = function (songJsonData, album, artists) {
  this.album = album;
  this.artists = artists;
  this.id = songJsonData['id'];
  this.detailedInfoLink = songJsonData['href'];
  this.title = songJsonData['name'];
  this.trackNumber = songJsonData['track_number'];
  this.previewURL = songJsonData['preview_url'];
  this.duration = songJsonData['duration_ms'];
  this.availableMarkets = songJsonData['available_markets'];
  this.isExplicit = songJsonData['explicit'];
  // simplified track objects from Spotify API don't have the popularity
  this.popularity = songJsonData['popularity'];
};

module.exports = Track;
