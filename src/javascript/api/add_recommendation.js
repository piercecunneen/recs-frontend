var make_request = require('./make_request.js');

function add_recommendation(recommendation_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'add_recommendation/',
    'POST',
    headers,
    recommendation_data,
    callback
  );
}

module.exports = add_recommendation;