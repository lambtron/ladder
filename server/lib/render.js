
/**
 * Module dependencies.
 */

var views = require('co-views');
var swig = views(__dirname + '/../../client-react/static', { map: { html: 'swig' } });

/**
 * Expose `swig`.
 */

module.exports = swig;
