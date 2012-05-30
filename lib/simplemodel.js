
var fs = require('fs');

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

function enhanceModel(model)
{
    for (var n in model)
    {
        var item = model[n];
        
        if (Array.isArray(item))
        {
            item.getByName = getByName;
            item.getById = getById;
            item.where = where;
        }
    }
}

exports.loadModel = function(filename)
{
    var model = JSON.parse(fs.readFileSync(filename).toString());
    enhanceModel(model);
    return model;
}

