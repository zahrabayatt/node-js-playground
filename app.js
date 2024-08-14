// Built-in modules and global objects in node js: https://nodejs.org/docs/latest/api/

// OS module docs: https://nodejs.org/docs/latest/api/os.html

// this file is a Common Js module!

const os = require("node:os");

const totalMemory = os.totalmem(); // Returns the amount of free system memory in bytes as an integer.

const freeMemory = os.freemem(); // Returns the total amount of system memory in bytes as an integer.

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// Before Node we couldn't get this kind of information about OS because JS only work inside of browsers and worked with object like window or document.
