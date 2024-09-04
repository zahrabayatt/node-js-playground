const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

// In more complex and enterprize application, you need know what environment, your code running on, like dev, stage, prod. you might to enable or disable certain features base on the current environment.

// How to get current environment?

// 1- process is a global object in Node that gives us access to current object and it has a property called env that gives us environment variables, we have a standard env variable called NODE_ENV and it returns the environment for this application and if not set it returns undefined
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// 2- app object has a method called get that we used to get various setting about application that one of the setting is env, and the default value is devilment.
console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan is enabled...");
}

// we set env for our application using this command:
// set NODE_ENV=production - only works in cmd not in powershell

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
