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
  // we use skip method to implement pagination:

  // in real world application, instead of hardcoded these numbers, we pass these values as query string parameters to our restful apis:
  // /api/courses?pageNumber=2&pageSize=10

  const pageNumber = 1; // it's page number not page index!
  const pageSize = 10;

  // get documents in given page number:
  const courses = await Course.find({
    author: "Zahra Bayat",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(courses);
}

getCourses();
