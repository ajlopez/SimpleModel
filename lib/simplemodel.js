
var fs = require('fs');

exports.loadModel = function(filename)
{
    var model = JSON.parse(fs.readFileSync(filename).toString());
    return model;
}

