const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  // these validating we wrote here, it's only meaningful in mongoose and we don't have validation level in mongodb and mongodb unlike no-sql or sql databases don't care about validation.

  // we use joy node package in our restful apis, we use that as first attack to make sure the data that client is sending us is valid data but we still need mongoose validation to make sure the data we're sending to database is valid data.

  name: { type: String, required: true }, // Add Validation
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Angular Course",
    author: "Zahra Bayat",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });

  try {
    await course.validate(); // it validate and if fails it returns a exception

    // another syntax to validate but it makes code messy:
    // course.validate(err => {
    //   if (err) {

    //   }
    // })

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
