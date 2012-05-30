
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));

assert.ok(model);

