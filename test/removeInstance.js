
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));
var entity = model.entities.name('customer');
entity.loadInstances(path.join(__dirname, 'customers.json'));

var instance = entity.instances().id(2);

assert.ok(instance);

entity.removeInstance(2);

assert.equal(entity.instances().id(2), null);
assert.ok(entity.instances().id(1));
assert.ok(entity.instances().id(3));

