// Built-in modules and global objects in node js: https://nodejs.org/docs/latest/api/

// this file is a Common Js module!

// HTTP module docs: https://nodejs.org/docs/latest/api/http.html

// we use HTTP module for creating networking applications. for example we can create a web server that listens for HTTP requests on a given port.

// with this module we can easily create a back-end service for our client applications like a web applications that we build with react or angular or mobile application running on a mobile device.

const http = require("node:http");

const server = http.createServer(); // create a web server
// this server is an event emitter so it has all the capabilities of event emitter. like we have a on method or addListener method,..
server.listen(3000);

server.on("connection", (socket) => {
  console.log("New connection.");
});

console.log("Listening on port 3000...");
