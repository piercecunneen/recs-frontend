var make_request = require('./make_request.js');

function add_favorite(favorite_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'add_favorite/',
    'POST',
    headers,
    favorite_data,
    callback
  );
}

module.exports = add_favorite;