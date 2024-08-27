const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    name: "Science Fiction",
    description:
      "Fiction dealing with futuristic settings, futuristic science and technology, space travel, time travel, parallel universes, and extraterrestrial life.",
  },
  {
    id: 2,
    name: "Fantasy",
    description:
      "Fiction set in a fictional universe, often inspired by real world myth and folklore, featuring magical elements.",
  },
  {
    id: 3,
    name: "Mystery",
    description:
      "Fiction dealing with the solution of a crime or the unraveling of secrets.",
  },
  {
    id: 4,
    name: "Thriller",
    description:
      "Fiction designed to hold the interest by the use of a high degree of intrigue, adventure, or suspense.",
  },
  {
    id: 5,
    name: "Romance",
    description:
      "Fiction focused on the romantic relationship between two or more characters.",
  },
  {
    id: 6,
    name: "Horror",
    description: "Fiction intended to frighten, scare, or disgust the reader.",
  },
  {
    id: 7,
    name: "Historical",
    description:
      "Fiction set in a real historical period, often with attention to historical accuracy.",
  },
  {
    id: 8,
    name: "Adventure",
    description:
      "Fiction that features stories of exciting and risky experiences, often in exotic locations.",
  },
  {
    id: 9,
    name: "Non-Fiction",
    description: "Literary work based on facts and real events.",
  },
  {
    id: 10,
    name: "Biography",
    description:
      "A detailed description of a person's life, including factual and personal experiences.",
  },
];

// Create a genre
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    description: req.body.description,
  };
  genres.push(genre);
  res.send(genre);
});

// Getting all the genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Getting a single genre
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  res.send(genre);
});

// Updating a genre
app.put("/api/genres/:id", (req, res) => {
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
  if (isValidString(req.body.description)) {
    genre.description = req.body.description;
  }
  res.send(genre);
});

// Deleting a genre
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found!");
    return;
  }

  const index = genres.findIndex((g) => g.id === genre.id);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    description: Joi.string(),
  });

  return schema.validate(genre);
}

function isValidString(str) {
  return typeof str === "string" && str.trim().length > 0;
}
