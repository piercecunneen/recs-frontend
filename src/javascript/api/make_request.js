var request = require('request');
var config  = require('../../../config/config.js');

function make_request(requestPath, method, headers, body, callback) {
  var base =  config.options.api_url;
  var url = base + "/api/v1.0/" + requestPath;
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
