var make_request = require('./make_request.js');


function create_user(user_data, callback) {
  var headers = {
    "Content-Type": "application/json"
  };
  make_request(
    'create_user/',
    'POST',
    headers,
    user_data,
    callback
  );
}


module.exports = create_user;