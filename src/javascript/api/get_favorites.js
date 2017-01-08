var make_request = require('./make_request.js');


function get_album_fav_data(request_body, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'albums_favorite_data/',
    'POST',
    headers,
    request_body,
    callback
  );
}

function get_user_favorites(user_id, callback) {
  make_request(
    'user_favorites/'.concat(user_id, '/'),
    "GET",
    {},
    {},
    callback
  );
}

module.exports = {
  get_album_fav_data: get_album_fav_data,
  get_user_favorites: get_user_favorites
};