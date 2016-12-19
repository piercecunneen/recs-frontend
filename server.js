'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('src'));

app.get('/*', function(req, res) {
  var index = path.join(
    __dirname,
    'src/statics/index.html');
  res.sendFile(index);
});
app.listen(5000, function() {
  /* eslint-disable */
  console.log('listening on localhost:5000')
  /* eslint-enable*/
});
