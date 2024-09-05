const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// Create a genre
router.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// Getting all the genres
router.get("/", (req, res) => {
  res.send(genres);
});

// Getting a single genre
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(genre);
});

// Updating a genre
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

// Deleting a genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  const index = genres.findIndex((g) => g.id === genre.id);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
