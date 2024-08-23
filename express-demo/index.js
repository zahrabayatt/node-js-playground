const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(3000, () => console.log("Listening on port 3000..."));

// every time we make a change to this code we have to go back to terminal and  stop this process (node index.js) and start it again. this is very tedious. the better way is use a node package called nodemon which is short for node monitor.
// npm i -g nodemon -> install nodemon package globally
// then instead of running your application with node use nodemon: nodemon index.js
// if we change something in our code, nodemon automatically restart our application.
