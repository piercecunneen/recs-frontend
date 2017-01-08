var make_request = require('./make_request.js');


function get_album_rec_data(request_body, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'albums_recommendation_data/',
    'POST',
    headers,
    request_body,
    callback
  );
}

function get_user_recommendations(user_id, callback) {
  make_request(
    'user_recommendations/'.concat(user_id, '/'),
    "GET",
    {},
    {},
    callback
  );
}

module.exports = {
  get_album_rec_data:       get_album_rec_data,
  get_user_recommendations: get_user_recommendations
};