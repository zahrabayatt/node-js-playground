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
  // get all courses
  // const courses = await Course.find();

  // get courses match the filter we passed as argument

  //   const courses = await Course.find({
  //     author: "Zahra Bayat",
  //     isPublished: true,
  //   });

  const courses = await Course.find({
    author: "Zahra Bayat",
    isPublished: true,
  }) // find return a document query that have these useful functions:
    .limit(10) // add limit number of result
    .sort({ name: 1 }) // you can sort base on multiple properties and 1 indicated acceding order and -1 indicated descending order
    .select({ name: 1, tags: 1 }); // we can select properties that we want to be return

  console.log(courses);
}

getCourses();
