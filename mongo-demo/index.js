const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// a collection in mongodb is like a table in relational database.
// a document in mongodb is like record/row in relational database.

// in mongoose we have a concept called schema, this is just specify to mongoose and it's not part of mongodb. we use schema in mongoose to define a shape of the document in mongodb collection, so we use it to define what are the properties we have in the document of mongodb collection.

// How to create a schema?

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String], // technically tags in database are pairs of key values where a key is index and the value is string
  date: { type: Date, default: Date.now }, // we can specify the default value
});

// Schema types in Mongoose:
// https://mongoosejs.com/docs/schematypes.html
// String
// Number
// Date
// Buffer - use for storing binary data
// Boolean
// ObjectId - use for assigning uniq identifier
// Array
// Decimal128
// Map
// Schema
// UUID
// BigInt
