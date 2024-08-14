// Built-in modules and global objects in node js: https://nodejs.org/docs/latest/api/

// this file is a Common Js module!

// FileSystem module docs: https://nodejs.org/docs/latest/api/fs.html

const fs = require("node:fs");

// all method comes with pair asyncrouchouse and syncrochounce:

//fs.access(); // syncrochounce method, avoid to use it, it is blocking!
//fs.accessSync(); // asynchrounce method, recommended to use!

const files = fs.readdirSync("./"); // Reads the contents of the directory.
console.log(files);
// output:
// [
//   '.git',
//   '.gitignore',
//   '.vscode',
//   'app.js',
//   'img',
//   'LICENSE',
//   'node_modules',
//   'package-lock.json',
//   'package.json'
// ]

// all these asynchrounce function take a callback function and run it when operation completes.
fs.readdir("./", (err, files) => {
  if (err) {
    console.log("Error", err);
    return;
  }

  console.log("Result", files);
});
