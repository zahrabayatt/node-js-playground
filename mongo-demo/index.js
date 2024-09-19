const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Zahra Bayat",
    tags: ["angular", "frontend"],
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // if you want to get all Courses that have a name like
  // Zahra
  // Bayat
  // Zahra Bayat
  // you can use regular expression.

  // const courses = await Course.find({
  //   author: "Zahra Bayat",
  //   isPublished: true,
  // });

  // Start with Zahra
  // /pattern/ is a syntax that indicate it's a regular expression.
  // const courses = await Course.find({ author: /^Zahra/ });

  // Ends with Bayat
  // const courses = await Course.find({ author: /Zahra$/ });

  // the two pattern so far is case sensitive if you want to be not case sensitive you add i at end of pattern
  // const courses = await Course.find({ author: /Zahra$/i });

  // Contains Zahra
  const courses = await Course.find({ author: /.*Zahra.*/ });

  // JS regular expression docs:
  // https://www.w3schools.com/js/js_regexp.asp
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

  console.log(courses);
}

getCourses();
