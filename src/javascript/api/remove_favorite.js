var make_request = require('./make_request.js');

function remove_favorite(favorite_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'remove_favorite/',
    'POST',
    headers,
    favorite_data,
    callback
  );
}

module.exports = remove_favorite;