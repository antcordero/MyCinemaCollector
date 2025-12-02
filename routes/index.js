var express = require("express");
var router = express.Router();
var dataService = require("../data/dataService");

/* GET home page. */
router.get("/", function (req, res, next) {
  const movies = dataService.findAllMovies();
  res.render("index", { title: "MyCinemaCollector", movies: movies });
});

/* GET movie detail page. */
router.get("/movies/:id", function (req, res, next) {
  const movieId = req.params.id;
  const movie = dataService.findMovieById(movieId);

  if (!movie) {
    //Si no existe, mandar a error
    return res.status(404).render("error", {
      message: "Movie not found",
      error: {},
    });
  }

  res.render("movie-detail", { title: movie.title, movie: movie });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { error: null });
});

/* GET contact page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", {});
});


module.exports = router;
