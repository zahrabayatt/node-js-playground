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
  // Comprising Operators in MongoDB which is also availabe in Mongoose:
  // en (Equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // imagemin the course has price property:

  // we got all courses with price 10:
  //   const courses = await Course.find({ price: 10 });

  // we got all courses with price greater than 10
  // we pass a object as value for price property and this object is a key value pairs where comparison operators is key and we specify them with $ prefix:
  // const courses = await Course.find({ price: { $gt: 10 } });
  // const courses = await Course.find({ price: { $gt: 10, $lte: 20 } });
  const courses = await Course.find({ price: { $in: [10, 15, 20] } }); // get all courses with price either are 10 or 15 or 20 dollars

  console.log(courses);
}

getCourses();
