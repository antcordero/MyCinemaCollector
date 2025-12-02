var express = require('express');
var router = express.Router();
var dataService = require('../data/dataService');

// Middleware para exigir login
function requireLogin(req, res, next) {
  if (req.session && req.session.isLogged) {
    return next();
  }
  return res.redirect('/login');
}

/* GET login page (pública) */
router.get('/login', function(req, res, next) {
  // si ya está logueado, lo mandas al home
  if (req.session && req.session.isLogged) {
    return res.redirect('/');
  }
  res.render('login', { error: null });
});

/* POST login: validar credenciales y guardar en sesión */
router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (dataService.validateUser(username, password)) {
    req.session.isLogged = true;
    req.session.username = username;
    return res.redirect('/');
  } else {
    return res.render('login', { error: 'Invalid credentials' });
  }
});

/* GET logout: destruir sesión */
router.get('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

/* GET home page (listado) – protegida */
router.get('/', requireLogin, function(req, res, next) {
  // Películas asociadas al usuario logueado
  const movies = dataService.findMoviesByOwner(req.session.username);

  res.render('index', { 
    title: 'MyCinemaCollector',
    movies: movies,
    isLogged: req.session.isLogged,
    username: req.session.username
  });
});

/* GET movie detail page – protegida */
router.get('/movies/:id', requireLogin, function(req, res, next) {
  const movieId = req.params.id;
  const movie = dataService.findMovieById(movieId);

  if (!movie) {
    return res.status(404).render('error', {
      message: 'Movie not found',
      error: {}
    });
  }

  res.render('movie-detail', { 
    title: movie.title,
    movie: movie,
    isLogged: req.session.isLogged,
    username: req.session.username
  });
});

/* GET contact page (puede ser pública o protegida; aquí la dejamos pública) */
router.get('/contact', function(req, res, next) {
  res.render('contact', {});
});

module.exports = router;
