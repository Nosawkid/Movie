const express = require("express");
const app = express();
const movieRoutes = require("./routes/movies");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Movie App");
});

app.use("/movies", movieRoutes);

module.exports = app;
