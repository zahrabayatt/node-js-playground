// Exercise:
// Get all the published backend courses,
// sort them by their name,
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

// Query Arrays docs: https://www.mongodb.com/docs/manual/tutorial/query-arrays/

// Select API: https://mongoosejs.com/docs/api/query.html#Query.prototype.select()

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: /backend/i,
  })
    .sort({ name: 1 }) // acc: .sort('name') dec: .sort('-name')
    .select({ name: 1, author: 1 }); // or .select('name author')
}

// when we decorate a function with async, JS engin automatically wrap the result of function in a promise.

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
