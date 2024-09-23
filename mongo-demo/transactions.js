const mongoose = require("mongoose");
const Fawn = require("fawn"); // it's a class

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// in some relational databases like sql server or my sql, we have the concept of transaction which basically means the groups of operations that should performs as a unit, so either all these operations will complete and change the sate of database or if something fails in the middle, all these operations that have been applied, will roll back and our database wil go back to initial state.

// in mongodb 4.X and higher we have transaction:
// https://www.mongodb.com/docs/manual/changeStreams/
// https://www.mongodb.com/docs/v6.2/core/transactions/
// we also have a technic that called Two Phase Commit:
// https://www.codementor.io/@christkv/mongodb-transactions-vs-two-phase-commit-u6blq7465

// there is a library that gives us the concept of transaction but internally implement this transaction using the two phase commit technic:
// fawn docs: https://www.npmjs.com/package/fawn

// Fawn.init(mongoose); didn't work
// base on this explanation: https://www.npmjs.com/package/fawn#fawn_init I try this and it works:
Fawn.init("mongodb://127.0.0.1:27017/playground");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const rentalSchema = new mongoose.Schema({
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
      },
    }),
    required: true,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

async function createMovie(title, numberInStock) {
  const movie = new Movie({
    title: title,
    numberInStock: numberInStock,
  });

  const result = await movie.save();
  console.log(result);
}

async function createRental(movieId) {
  let movie = await Movie.findById(movieId);
  if (!movie) {
    console.error("Invalid movie.");
    return;
  }

  if (movie.numberInStock === 0) {
    console.error("Movie not in stock.");
    return;
  }

  let rental = new Rental({
    movie: {
      _id: movie._id,
      title: movie.title,
    },
  });
  // pass the actual name of the collection (The plural not singular), which is case sensitive
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    // you can remove document
    //.remove()
  } catch (ex) {
    console.error("something failed.", ex);
  }

  console.log(movie, rental);
}

// createMovie("Terminator", 8);

createRental("66f1699b2ab4fad3b881b22e"); // didn't work, the package is outdated and I got this error:
// Unhandled rejection MongoError: Unsupported OP_QUERY command: insert. The client driver may require an upgrade.
