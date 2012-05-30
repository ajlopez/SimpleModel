
var fs = require('fs');

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

function loadInstances(filename)
{
    var data = JSON.parse(fs.readFileSync(filename).toString());
    
    data.id = getById;
    data.name = getByName;
    data.where = where;
    data.maxId = getMaxId;
    
    instances[this.name] = data;
}

function enhanceModel(model)
{
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

