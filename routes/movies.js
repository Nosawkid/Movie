const movieRoutes = require("express").Router();
let movies = require("../data");

movieRoutes.get("/", (req, res) => {
  console.log(...movies.map((el) => el.id));
  res.json(movies);
});

movieRoutes.post("/", (req, res) => {
  const { title, genre, releaseYear, rating } = req.body;
  if (!title || !genre || !releaseYear) {
    return res.status(400).json({ error: "Required fields are empty" });
  }
  if (!rating) {
    rating = 0;
  }

  // const newId =
  const id =
    movies.length > 0 ? Math.max(...movies.map((movie) => movie.id)) + 1 : 1;

  const newMovie = {
    id,
    title,
    genre,
    releaseYear,
    rating,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

movieRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) {
    return res.status(404).send({ error: "No movie found" });
  }
  res.json(movie);
});

movieRoutes.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (!rating) {
    return res.status(400).json({ error: "No rating" });
  }

  if (rating < 0 || rating > 10) {
    return res
      .status(400)
      .json({ error: "Rating should be greater than 0 and less than 10" });
  }

  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) {
    return res.status(400).json({ error: "No movie found" });
  }
  movie.rating = rating;
  res.json(movie);
});

movieRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) {
    return res.status(404).json({ error: "No movie found" });
  }
  movies = movies.filter((el) => el.id !== parseInt(id));
  res.status(200).json({ message: `${movie.title} deleted successfully !` });
});

module.exports = movieRoutes;
