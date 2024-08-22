const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000...");

// with HTTP module we can create a web server and with this code that we can check incoming url and define various routs and APIs for our application. while this approach certainly works but it's not maintainable. because as we define more routs for our application we add more if blocks in the create server call back function and it makes code messy and not maintainable. that is where a framework like Express comes to picture. a fretwork gives our application a proper structure so we can easily add more routs and keep our code maintainable.

// https://www.npmjs.com/package/express
