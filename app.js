const logger = require("./logger"); // or require("./logger.js");

// use const for module because we don't want to accidentally overwrite a module! so if we use const and accidentally reset object we're gonna get an error at compile time instead of runtime with tools lke jshint we can scan all our JavaScript code for errors!

//logger = 1; jshint error: Attempting to override 'logger' which is a constant.

console.log(logger);
logger.log("Hello world!");
