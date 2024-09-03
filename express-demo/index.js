const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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

// Middleware Or Middleware Function:
// It's basically a function that take a request object and either returns a response to the client or passes control to another middleware function.

// Example:
// route handler like in app.get(route, handler), handle is a middleware function.

// express.json(); it returns a middleware function and the job of it to read a request and if there is a json object in the body of the request, it will parsed the body of the request into the json object and then will set req.body property in request

// Request Processing Pipeline:
// In runtime when we receive a request on the server, that request goes through this pipeline. in this pipeline we have one or more middleware function. each middleware function either determines the request's response cycle by returning response object or it will pass control to another middleware function.
// in our current implementation our request processing pipeline has two middleware function:
// the first one is json() which parses the json object of request body in req.body and passes control to second middleware function which is route() handler and it determines response object.

// Express include a few built-in middleware function but we can also define our custom middleware functions and put it in front of our request processing pipeline.

// every request we get on the server will go through of middleware functions.

// with custom middleware functions we can do cost cutting concerns like login, authentication, authorization,...
