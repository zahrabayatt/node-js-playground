const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  // depending of type of these property we have additional validator for example for string we have maxLength and minLength and match:
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"], // enum validator
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    // The 'required' property can be a boolean or a function returning a boolean

    //In Mongoose, when you use a regular function (not an arrow function) inside the schema methods or properties, this refers to the current document. However, if you use an arrow function, this does not bind to the current document; instead, it inherits the value of this from the surrounding context (which is likely not the document).
    required: function () {
      return this.isPublished;
    },

    // for numbers we have min and max validators, we also have these validators for dates:
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Angular Course",
    author: "Zahra Bayat",
    tags: ["angular", "frontend"],
    isPublished: true,
    category: "-",
    // price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex);
  }
}

async function getCourses() {
  const pageNumber = 1;
  const pageSize = 10;

  const courses = await Course.find({
    author: "Zahra Bayat",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true }
  );

  console.log(course);
}

async function removeCourse(id) {
  const course = await Course.findByIdAndDelete(id);

  console.log(course);
}

createCourse();
