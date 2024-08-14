// Built-in modules and global objects in node js: https://nodejs.org/docs/latest/api/

// path module docs: https://nodejs.org/docs/latest/api/path.html

const path = require("node:path");

const pathObj = path.parse(__filename);
console.log(pathObj);
// output:
//{
//   root: 'C:\\',
//   dir: 'C:\\Users\\LENOVO\\source\\repos\\node-js-playground',
//   base: 'app.js',
//   ext: '.js',
//   name: 'app'
// }
