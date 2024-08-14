const url = "http://mylogger.io/log";

console.log(__filename);
console.log(__dirname);
function log(message) {
  // Send an HTTP request
  console.log(message);
}

module.exports = log;

// Node does not  execute our code directly it always wraps the code inside each module, something like this:

(function (exports, require, module, __filename, __dirname) {
  const url = "http://mylogger.io/log";

  function log(message) {
    // Send an HTTP request
    console.log(message);
  }

  module.exports = log;
})();

// it is an immediately invoked function expression or IIFE.

// we called this function, Module Wrapper Function.

// in the arguments of this function, require function is not global! in fact it's local to each module so in every module require is one of the arguments that is passed to this function.

// module argument of this function is the module that we used like this:

module.exports = log;

// exports argument of this function is short for module.exports, so you can export in two ways:

module.exports.log = log;
exports.log = log;

// you can not rest exports like that:
exports = log; // wrong

// you can rest module.exports like that:
module.exports = log; // write

// __filename argument of this function is the complete path of this file:
console.log(__filename);
// C:\Users\LENOVO\source\repos\node-js-playground\logger.js

// __dirname argument of this function is the path of the directory that contains the module:
console.log(__dirname);
// C:\Users\LENOVO\source\repos\node-js-playground
