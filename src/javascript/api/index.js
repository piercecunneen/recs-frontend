var create_user = require('./create_user.js');
var create_recommendation = require('./create_recommendation.js');
var create_request = require('./create_request.js');
var get_favorites = require('./get_favorites.js');
var get_recommendations = require('./get_recommendations.js');

module.exports = {
  create_user: create_user,
  create_recommendation: create_recommendation,
  create_request: create_request,
  get_album_fav_data: get_favorites.get_album_fav_data,
  get_album_rec_data: get_recommendations.get_album_rec_data
};