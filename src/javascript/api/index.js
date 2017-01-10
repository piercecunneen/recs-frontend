var create_user = require('./create_user.js');
var add_recommendation = require('./add_recommendation.js');
var create_request = require('./create_request.js');
var get_favorites = require('./get_favorites.js');
var get_recommendations = require('./get_recommendations.js');
var add_favorite = require('./add_favorite.js');
var remove_favorite = require('./remove_favorite.js');
var submit_rec_rating = require('./submit_rec_rating.js');


module.exports = {
  create_user:              create_user,
  add_recommendation:       add_recommendation,
  create_request:           create_request,
  get_album_fav_data:       get_favorites.get_album_fav_data,
  get_album_rec_data:       get_recommendations.get_album_rec_data,
  add_favorite:             add_favorite,
  remove_favorite:          remove_favorite,
  get_user_favorites:       get_favorites.get_user_favorites,
  get_user_recommendations: get_recommendations.get_user_recommendations,
  submit_rec_rating:        submit_rec_rating
};