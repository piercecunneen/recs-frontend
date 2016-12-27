var make_request = require('./make_request.js');

function create_user(recommendation_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'add_recommendation/',
    'POST',
    headers,
    recommendation_data,
    function(err, httpResp, body) {
      if (err) {
        callback(err);
      } else {
        callback(body);
      }
    });
}

module.exports = create_user;