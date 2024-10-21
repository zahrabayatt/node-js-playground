const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1); // code 0 means success and anything other than 0 means failure
}
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses); // add route
app.use("/", home);

async function generateJWT() {
  // you should not hard code it and put it in environment variables.
  // use config package to store data in environment variables

  // we set environment variable for our application using this command:
  // set vidly_jwtPrivateKey=your_secret - only works in cmd not in powershell

  const token = jwt.sign({ id: "userId" }, config.get("jwtPrivateKey"));
  console.log(token);
}

generateJWT();
