
/**
 * Module dependencies.
 */

var views = require('co-views');
var swig = views(__dirname + '/../public/views', { map: { html: 'swig' } });

/**
 * Expose `swig`.
 */

module.exports = swig;
