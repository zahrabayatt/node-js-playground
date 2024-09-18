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
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Zahra Bayat",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  // save is a async function
  // result is a course that is saved in database and mongodb assign a uniq id to it
  const result = await course.save();
  console.log(result);
  // log:
  //   {
  //   name: 'Angular Course',
  //   author: 'Zahra Bayat',
  //   tags: [ 'angular', 'frontend' ],
  //   _id: new ObjectId('66eb4c60ffeb176b160e4114'),
  //   date: 2024-09-18T21:55:44.345Z,
  //   __v: 0
  // }
}

createCourse();
