const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

// Create a genre
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// Getting all the genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Getting a single genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(genre);
});

// Updating a genre
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(genre);
});

// Deleting a genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(genre);
});

module.exports = router;
