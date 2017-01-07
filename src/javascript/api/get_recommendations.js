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

module.exports = {
  get_album_rec_data: get_album_rec_data
};