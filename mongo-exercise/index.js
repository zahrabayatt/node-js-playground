// Exercise:
// Get all the published frontend and backend courses,
// sort them by their price in a descending order,
// pick only their name and author,
// and display them.

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// Use the $in Operator to Match Values in an Array: https://www.mongodb.com/docs/manual/reference/operator/query/in/#use-the--in-operator-to-match-values-in-an-array

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: [/backend/i, /frontend/i] },
  })
    //.or([{ tags: /backend/i }, { tags: /frontend/i }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
