var request = require('request');

function create_user(user_data, callback) {
  request(
    {
      url: 'http://0.0.0.0:2323/api/v1.0/create_user/',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      json: user_data
    },
    function (err, httpResponse, body) {
      callback(err, httpResponse, body);
    }
  );
}


module.exports = create_user;