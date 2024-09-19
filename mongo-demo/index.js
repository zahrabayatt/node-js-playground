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
  // Theres two ways to update a document in MongoDB:
  // Approach1: Query first
  // findById()
  // Modify its properties
  // save()

  const course = await Course.findById(id);
  if (!course) {
    return;
  }

  // course.isPublished = true;
  // course.author = "Another Author";
  // Or

  course.set({
    isPublished: true,
    author: "Another Author",
  });

  const result = await course.save();
  console.log(result);

  // Approach2: Update first
  // Update directly
  // Optionally: get the updated document
}

updateCourse("66eb4fc5ea66d9db73455e85");
