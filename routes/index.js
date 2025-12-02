var express = require("express");
var router = express.Router();
var dataService = require("../data/dataService");

// Middleware: exige login SOLO donde se use
function requireLogin(req, res, next) {
  if (req.session && req.session.isLogged) return next();
  return res.redirect("/login");
}

/* GET home page (muestra todas las pelis) */
router.get("/", function (req, res, next) {
  const movies = dataService.findAllMovies();
  res.render("index", { title: "MyCinemaCollector", movies: movies });
});

/* GET movie detail page (pública) */
router.get("/movies/:id", function (req, res, next) {
  const movieId = req.params.id;
  const movie = dataService.findMovieById(movieId);

  if (!movie) {
    return res.status(404).render("error", { message: "Movie not found", error: {}, });
  }

  res.render("movie-detail", { title: movie.title, movie: movie });
});

/* GET login page */
router.get("/login", function (req, res, next) {
  res.render("login", { error: null });
});

/* GET contact page */
router.get("/contact", function (req, res, next) {
  res.render("contact", {});
});

/* GET my movies (PROTEGIDA: solo usuario logueado) */
router.get("/my-movies", requireLogin, function (req, res, next) {
  const movies = dataService.findMoviesByOwner(req.session.username);
  res.render("user-movies", { title: "My movies", username: req.session.username, movies: movies });
});

module.exports = router;
