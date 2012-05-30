
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

function getInstances()
{
    return instances[this.name];
}

function loadInstances(filename)
{
    var data = JSON.parse(fs.readFileSync(filename).toString());
    
    data.id = getById;
    data.name = getByName;
    data.where = where;
    
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

