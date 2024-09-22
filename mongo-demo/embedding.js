const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  // we can apply validation to author properties.
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //author: authorSchema,

    // we can apply validation to author:
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();

  console.log(courses);
}

// author is a sub document of course document and it is like a normal document and most features are available on normal document, are also available on sub documents for example we can implement validation for them, however these sub documents can not be saved by their own, they can only be saved in context of their parent, for example:

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "John";
  // course.save();

  // instead of finding the course first and then update, we can also update author directly:
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        // access to nested properties using dot
        "author.name": "John Smith",
      },

      // we can also unset the property using unset operator:
      // $unset: {
      //   author: "", // this course will not have a author property anymore
      // },
    }
  );
}

//createCourse("Node Course", new Author({ name: "Zahra" }));

updateAuthor("66efead411a285260c8c1b5c");

// listCourses();
