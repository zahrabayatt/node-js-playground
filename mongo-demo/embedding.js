const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // embed array of sub document
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();

  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  // with id method in documentArray, we can look up child object by id in other words, it searches array items for the first document with a matching _id.:
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Zahra" }),
//   new Author({ name: "John" }),
//   new Author({ name: "Heather" }),
// ]);

// addAuthor("66eff162c4e8548930fe83fb", new Author({ name: "Amy" }));

removeAuthor("66eff162c4e8548930fe83fb", "66eff2db55d5a1657e270416");
