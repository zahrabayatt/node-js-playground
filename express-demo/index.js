const _ = require("lodash"); // by convention we store the result in the _ (underscore)
const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses); // add route
app.use("/", home);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// lodash: A modern JavaScript utility library delivering modularity, performance & extras.
// docs: https://lodash.com/

const user = {
  name: "Zahra",
  email: "zahra.bayat13799@gmail.com",
  password: "12345678",
};

console.log({
  name: user.name,
  email: user.email,
});

// better way is using the pick function in lodash:
console.log(_.pick(user, ["name", "email"]));
