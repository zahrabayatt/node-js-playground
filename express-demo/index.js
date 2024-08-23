const Joi = require("joi"); // it return a class, so the first character of module's name should be Capital
const express = require("express");
const app = express();

// Add middleware to get req.body
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
  }

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  // You can valuate data via writing logic like this:
  // if (!req.body.name || req.body.name.length < 3) {
  //   res
  //     .status(400)
  //     .send("Name is required and should be minimum 3 characters.");
  // }
  // Or for data validation you can use node package called joi : https://www.npmjs.com/package/joi

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
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
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
