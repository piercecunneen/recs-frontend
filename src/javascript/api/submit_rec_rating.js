var make_request = require('./make_request.js');

function submit_rec_rating(rating_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'submit_rec_rating/',
    'POST',
    headers,
    rating_data,
    callback
  );
}

module.exports = submit_rec_rating;