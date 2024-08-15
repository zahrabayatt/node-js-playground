// in real world example we don't respond to the connection event to build an Http service! instead we do this:

const http = require("node:http");

const server = http.createServer((req, res) => {
  // in real world we don't use http module for building backend service because as you can see here as we add more routes here this code gets more complex! instead we use framework like Express(it's top of the Http Module with Node.js),...
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000...");
