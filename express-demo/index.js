const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// Read PORT from environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Define a environment variable in Powershell:
// $env:PORT=5000
// Check the value of environment variable in Powershell:
// $env:PORT

// Define a environment variable in cmd:
// set PORT=5000
// Check the value of environment variable in cmd:
// set PORT

// the both way is temporary and exist until you close terminal.
// to define a permeate environment variable in windows machine check this link: https://stackoverflow.com/questions/5898131/set-a-persistent-environment-variable-from-cmd-exe
