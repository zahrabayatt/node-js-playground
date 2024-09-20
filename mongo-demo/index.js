const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// when we defining a schema, we can set the type of property directly or use a schema type object.

// the schema type object has few properties like: type, required, ...

// a few more properties that available in this schema type object:

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  // for string type we have additional properties:
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    // uppercase: true,
    lowercase: true, // store category as lowercase even we set it to uppercase
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(v && v.length > 0);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    // custom getter - round value when we getting data
    get: (v) => Math.round(v),
    // custom setter - round value when we adding data
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Zahra Bayat",
    tags: ["frontend"],
    isPublished: true,
    category: "Web",
    price: 15.098,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
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
