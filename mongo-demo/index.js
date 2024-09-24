const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to MongoDB...", err));

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

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
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

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
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

app.post("/api/rentals", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    res.status(400).send("Invalid movie.");
    return;
  }

  if (movie.numberInStock === 0) {
    res.status(400).send("Movie not in stock.");
    return;
  }

  let rental = new Rental({
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const resultRental = await rental.save({ session: session });
      await movie.updateOne(
        { $inc: { numberInStock: -1 } },
        { session: session }
      );
      res.send(rental);
    });
  } catch (ex) {
    res.status(500).send("Something failed.");
  } finally {
    await session.endSession();
  }
});

function validateRental(rental) {
  //   const schema = Joi.object({
  //     movieId: Joi.string().required(),
  //   });
  // validate object id using joi-objectid package
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}
