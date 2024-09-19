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
  // Approach2: Update first
  // Update directly
  // Optionally: get the updated document

  // MongoDB update operates: https://www.mongodb.com/docs/manual/reference/operator/update/

  // const result = await Course.updateOne({_id: id});
  // or
  // const result = await Course.updateMany({isPublished: false});
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Zahra Bayat",
        isPublished: false,
      },
    }
  );

  // if you want to get a document that updated use findByIdAndUpdate method:

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true } // if we don't set this argument, we got the course before updating and not updated course!
  );

  console.log(course);

  console.log(result);
}

updateCourse("66eb4fc5ea66d9db73455e85");
