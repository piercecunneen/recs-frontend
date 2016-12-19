'use strict';

var test = require('tape');
var format = require('../formatSearchString.js');

test('correctly replaces spaces with +', function t(assert) {
  var queryString = "Panic! At the Disco";
  var formattedString = "Panic!+At+the+Disco";
  assert.equal(format(queryString), formattedString);

  assert.end();
});

test('does not change string with no spaces', function t(assert) {
  var queryString = "Krewella";
  var formattedString = "Krewella";
  assert.equal(format(queryString), formattedString);

  assert.end();
});