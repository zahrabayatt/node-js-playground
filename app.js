console.log(); // console is a global object so it's a part of global scope which means we can access it anywhere in any files.

// we have a bunch of other objects and functions that are also globally available in node for example:

setTimeout(() => {}, timeout); // we use this to call a function after a given delay.
setInterval(() => {}, interval); // we use to repeatedly call a function after a given delay.
clearInterval(); // we use to stop that function from being called repeatedly

// So these are the global objects in JS and these are just the part of standard JS, we can use them on the client or inside of a node.

// In browsers we have this window object that represents our global scope so all the variables and functions that defined globally, we can access them via this window:

window.console.log();
window.setTimeout();
window.setInterval();
window.clearInterval();

var message = "";
console.log(window.message); // this variable that declare globally also available in window object.

// but in node we don't have this window object! instead we have another object that we called global:

global.console.log();
global.setTimeout();
global.setInterval();
global.clearInterval();

var message = "";
console.log(global.message); // undefined - this variable is not added to the global object! these variable only scoped to this file(app.js) so they are not available outside of this file. this is because of node modular system.
