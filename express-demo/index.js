const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

// for testing, in cmd run these commands:
// set NODE_DEV=development
// nodemon index.js

// if you want to change the NODE_DEV, you should close and open cmd and then run set command!

console.log("Mail Password: " + config.get("mail.password"));

// for testing, create a file with exact spelling, custom-environment-variables.json for mapping config to environment variables and then set environment variable and run application:
// set app_password=1234
// nodemon index.js

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan is enabled...");
}

app.use(logger);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found!");
    return;
  }

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found!");
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
  });

  return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found!");
    return;
  }

  const courseIndex = courses.indexOf(course);
  courses.splice(courseIndex, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// one topic that goes with hand with hand with environment is the topic to storing application's configuration and overwrite these setting in each environment. in each environment you gonna use different database or mail server.

// there is various node packages for managing configuration. the most popular one is RC.
// RC docs: https://www.npmjs.com/package/rc
// another node package for this propose is npm config:
// npm config docs: https://www.npmjs.com/package/config

// you should not store application secrets in config files like API Key,... because it is expose in source control and every one who has access to that can see the secrets. so the way we dealing with these secrets is that to storing in environment variables and read them using config module.

// define a json file in config for mapping environment variable with config for example we map mail.password to app_password environment variable and then manually define this environment variable in each environment.
