const mongoose = require("mongoose");

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

// to use transaction from mongodb you should do these things:
// convert your mongodb from standalone self-managed to a replica set :
// 1- add this lines in your mongod.cfg file in C:\Program Files\MongoDB\Server\7.0\bin :
// replication:
//  replSetName: rs0

// 2- restart the mongodb server using these command:
// net stop MongoDB
// net start MongoDB
// or you can click ctrl + R and open services.msc and then find MongoDB Server and then right click and hit stop and start option.

// open mongosh terminal and run these commands:
// rs.initiate() // You only have to initiate the replica set once.
// rs.conf() // To view the replica set configuration
// rs.status() // To check the status of the replica set
// rs.add()

// if you want to create a new connection string in MongoDB Compass, remember to check the direct connection option in setting.

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

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const resultRental = await rental.save({ session: session });
      // throw new Error("Could not create the rental"); // for testing purpose
      await movie.updateOne(
        { $inc: { numberInStock: -1 } },
        { session: session }
      );
      console.log(resultRental); // in out put it has id and mongoose filled with default value and it didn't fill by mongodb
    });
    console.log("Rental is Created successfully.");
  } catch (ex) {
    console.error("something failed.", ex);
  } finally {
    await session.endSession();
  }
}

// createMovie("Terminator", 8);

createRental("66f1699b2ab4fad3b881b22e");

// How to use Transaction in MongoDB?

// The withTransaction method is considered the more modern and simplified approach to handling transactions in Mongoose. It abstracts away some of the boilerplate code, automatically managing the starting, committing, and aborting of transactions.

// If you don't use withTransaction, you'd typically manage transactions manually by:

// Starting the session.
// Starting the transaction.
// Performing operations.
// Committing or aborting the transaction based on success or failure.
// Ending the session.
// While both methods are valid, withTransaction is preferred for its clarity and ease of use. Here's a quick comparison:

// Using withTransaction (modern syntax):
// javascript

// const session = await mongoose.startSession();
// try {
//   await session.withTransaction(async () => {
//     // Your operations here
//   });
// } catch (error) {
//   console.error("Transaction failed:", error);
// } finally {
//   await session.endSession();
// }

// Without withTransaction (manual approach):
// javascript

// const session = await mongoose.startSession();
// session.startTransaction();
// try {
//   // Your operations here
//   await session.commitTransaction();
// } catch (error) {
//   await session.abortTransaction();
//   console.error("Transaction failed:", error);
// } finally {
//   await session.endSession();
// }

// In summary, withTransaction is the newer, more streamlined syntax, while the manual approach gives you more control but requires more code.
