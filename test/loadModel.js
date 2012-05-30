
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));

assert.ok(model);
assert.ok(model.entities);
assert.ok(model.entities.name('customer'));
assert.ok(model.entities.name('order'));
assert.equal(model.entities.name('foo'), null);
assert.ok(model.entities.where(function(item) { return item.name == 'customer'; }));
assert.equal(model.entities.where(function(item) { return item.name == 'customer'; }).length, 1);

