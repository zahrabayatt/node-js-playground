const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params.year + " " + req.params.month);
  // res.send(req.params);
  res.send(req.query);
  //res.send(req.query.sortBy);
});

// we use route parameters for essentials or required values and we use query string parameters to provide additional data and anything is optional

// read route parameters from req in handler: req.params
// read query string parameters from req in handler: req.query

// we define query strings parameters in endpoint like this:
// ?sortBy=name
// ?sortBy=name&idFilter=2

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
