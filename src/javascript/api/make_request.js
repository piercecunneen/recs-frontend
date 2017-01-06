var request = require('request');

function make_request(requestPath, method, headers, body, callback) {
  var url = "http://0.0.0.0:2323/api/v1.0/" + requestPath;
  request(
    {
      url: url,
      method: method,
      headers: headers,
      json: body
    },
    function (err, httpResponse, body) {
      if (err) {
        callback(err);
      } else {
        callback(null, body);
      }
    }
  );
}

module.exports = make_request;