const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      // we can store a invalid author id and mongodb doesn't care about it.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", // name of target collection
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    // we use populate method to load author properties. we pass the author which is the property name in course schema.
    //.populate("author")
    // we can specify the properties that we want to include or exclude:
    //.populate("author", "name")
    // exclude _id:
    .populate("author", "name -_id")
    // we can populate multiple properties, for example imagine each course has a category and category references to category document:
    .populate("category", "name")
    .select("name author");

  console.log(courses);
}

// createAuthor("Zahra", "My bio", "My Website");

// createCourse("Node Course", "66efe652c478de6146a7e885");

listCourses();

// if we create a course document with invalid author id, mongodb doesn't care about it and when we load the course document, it return the author null.
