const _ = require("underscore"); // this module exist in node_modules folder

// base on require argument the node module could be:
// - Core module (like 'http')
// - File or folder (like './logger')
// - node_modules (like 'underscore')

// underscore package docs:https://underscorejs.org/

var result = _.contains([1, 2, 3], 3);
console.log(result);
