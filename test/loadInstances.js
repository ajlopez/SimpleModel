
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));
var entity = model.entities.name('customer');

entity.loadInstances(path.join(__dirname, 'customers.json'));

assert.ok(entity.instances());
assert.ok(entity.instances().id(1));
assert.equal(entity.instances().id(2).name, 'Apple');
assert.equal(entity.instances().name('Google').id, 3);

assert.equal(entity.instances().maxId(), 3);

