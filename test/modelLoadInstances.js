
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));
model.loadInstances(__dirname);
assert.ok(model.entities.name('customer').instances());
assert.ok(model.entities.name('order').instances());

