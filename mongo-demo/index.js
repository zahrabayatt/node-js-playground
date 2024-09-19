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
  // logical operators:
  // or
  // and

  // const courses = await Course.find({
  //   author: "Zahra Bayat",
  //   isPublished: true,
  // });

  // if you want courses that published by "Zahra Bayat" or is published:
  // we use or method and pass a array of filters, each object in array is a filter.
  // we also have and method and pass a array of filters.
  const courses = await Course.find()
    .or([{ isPublished: true }, { author: "Zahra Bayat" }])
    .and([{ isPublished: true }, { author: "Zahra Bayat" }]);

  console.log(courses);
}

getCourses();
