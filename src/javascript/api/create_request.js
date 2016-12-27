var make_request = require('./make_request.js');

function create_user(request_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request('add_request/', 'POST', headers, request_data, callback);
}

module.exports = create_user;