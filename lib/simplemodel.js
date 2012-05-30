
var fs = require('fs'),
    path = require('path');

var instances = {};

function where(fn)
{
    var result = [];
    
    for (var n in this)
    {
        var item = this[n];

        if (fn(item))
            result.push(item);
    }
    
    return result;
}

function getByName(name)
{
    for (var n in this)
    {
        var item = this[n];

        if (item.name == name)
            return item;
    }
    
    return null;
}

function getById(id)
{
    for (var n in this)
    {
        var item = this[n];

        if (item.id == id)
            return item;
    }
    
    return null;
}

function getMaxId()
{
    var maxid = 0;
    
    for (var n in this)
    {
        var item = this[n];               

        if (item.id > maxid)
            maxid = item.id;
    }
    
    return maxid;
}

function getInstances()
{
    return instances[this.name];
}

function addInstance(data)
{
    var newinstance = {};
    
    for (var n in this.properties)
        newinstance[n.name] = data[n.name];
        
    newinstance.id = this.instances().maxId() + 1;
    this.instances().push(newinstance);
    
    return newinstance;
}

function removeInstance(id)
{
    var instances = this.instances();
    
    for (var n in instances)
        if (instances[n].id == id)
        {
            var instance = instances[n];
            instances.splice(n,1);
            return instance;
        }
        
    return null;
}

function loadInstances(filename)
{
    var data = JSON.parse(fs.readFileSync(filename).toString());
    
    data.id = getById;
    data.name = getByName;
    data.where = where;
    data.maxId = getMaxId;
    
    instances[this.name] = data;
}

function loadModelInstances(dirname)
{
    this.entities.forEach(function(entity)
    {
        var filename = path.join(dirname, entity.setName + '.json');
        
        if (path.existsSync(filename))
            entity.loadInstances(filename);
    });
}

function enhanceModel(model)
{
    model.loadInstances = loadModelInstances;
    
    for (var n in model)
    {
        var item = model[n];
        
        if (Array.isArray(item))
        {
            item.name = getByName;
            item.id = getById;
            item.where = where;
        
            if (n == 'entities')
                for (var m in item)
                {
                    var entity = item[m];
                    entity.loadInstances = loadInstances;
                    entity.instances = getInstances;
                    entity.addInstance = addInstance;
                    entity.removeInstance = removeInstance;
                }
        }
    }
}

exports.loadModel = function(filename)
{
    var model = JSON.parse(fs.readFileSync(filename).toString());
    enhanceModel(model);
    return model;
}

