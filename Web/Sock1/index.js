var Noble = require('./node_modules/noble/lib/noble');
var bindings = require('./node_modules/noble/lib/resolve-bindings')();

module.exports = new Noble(bindings);