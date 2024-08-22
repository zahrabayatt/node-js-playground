// express js doc: https://expressjs.com/en/4x/api.html

const express = require("express");

const app = express(); // by convention we called the return object of express method as app and this represent our app.

// this app object has a bunch of useful methods:
// app.get();
// app.post();
// app.put();
// app.delete();
// all these methods corresponds to HTTP methods or verbs.

// example:
app.get("/", (req, res) => {
  res.send("Hello World");
}); // we send a route url and a route handler

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(3000, () => console.log("Listening on port 3000..."));

// in this implementation we don't have those if blocks and we define routs with these app methods like get and as our applications grows we can move some of these routs in another file so express makes our code structure.
