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

// in js we can have a class and also have a instance of class which is called object. in this application we want to have a class called Course and a instance of Course called nodeCourse which is object and then we can save that nodeCourse in the database.
// To create a class like Course, we need to compile the courseSchema to a model, this is how we do it:

// the first argument is a singular name of collection that is model is for and the second argument is the schema that defined the shape of the document in this collection.
const Course = mongoose.model("Course", courseSchema); // Course is a class! we use upper case for class names.

// now we can create a object base on this class:
const course = new Course({
  name: "Node.js Course",
  author: "Zahra Bayat",
  tags: ["node", "backend"],
  isPublished: true,
}); // course is a object! we use pascal case for object names.

// in MongoDB or in no-sql databases general, a document can be a complex object like tags is a property of string, we don't have something like that in relational databases, in other words a row in relational databases has simple attributes, if you want to model this structure like course in relational database, you need three tables, Courses, Tags and the intermediary table called course tags because we have a many to many relationship between Courses and Tags. in no-sql databases like MongoDB we don't need this structures and we don't have to define these table and scripted, we simply carate our object and store them in a database. that's why we called them schemaless, they don't have schema.
