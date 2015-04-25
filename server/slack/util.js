
/**
 * Module dependencies.
 */

var request = require('superagent');
var User = require('../lib/user');
var Game = require('../lib/game');
var fmt = require('../lib/fmt');
var moment = require('moment');
var co = require('co');

/**
 * Thunkified post.
 */

exports.post = function(body) {
  var uri = 'https://hooks.slack.com/services/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';
  return function(fn) {
    request
      .post(uri)
      .send(body)
      .end(fn);
  };
};
