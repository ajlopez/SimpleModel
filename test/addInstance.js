
var $ = require('../'),
	assert = require('assert'),
	path = require('path');
	
var model = $.loadModel(path.join(__dirname, 'model.json'));
var entity = model.entities.name('customer');
entity.loadInstances(path.join(__dirname, 'customers.json'));
var maxid = entity.instances().maxId();
var instance = entity.addInstance( { name: 'Yahoo' });

assert.ok(instance);
assert.equal(instance.id, maxid + 1);

var newinstance = entity.instances().id(instance.id);

assert.ok(newinstance);

