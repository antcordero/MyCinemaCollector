const path = require('path');
const fs = require('fs');

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf8')
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8')
);

// Guarda el array de películas en el JSON
function saveMovies() {
  fs.writeFileSync(
    path.join(__dirname, 'movies.json'),
    JSON.stringify(movies, null, 2),
    'utf8'
  );
}

// --- Funciones de películas ---

function findAllMovies() {
  return movies;
}

// Por si quieres filtrar “recientes”
function findMoviesAfterYear(year) {
  return movies.filter(m => m.year >= year);
}

function findMovieById(id) {
  return movies.filter(m => m.id == id)[0];
}

function saveMovie(movie) {
  movies.push(movie);
  saveMovies();
}

// --- Función de login, inspirada en el profe (para más adelante) ---
function validateUser(email, password) {
  const result = users.filter(u => u.username === email);
  if (result.length === 0) {
    return false;
  } else {
    return result[0].password === password;
  }
}

//Mostrar las películas asociadas a un usuario por su email
function findMoviesByOwner(ownerEmail) {
  //Devuelve solo las pelis donde haya al menos una copia de ese usuario
  return movies.filter(movie =>
    movie.copies && movie.copies.some(c => c.owner === ownerEmail)
  );
}

module.exports = {
  findAllMovies,
  findMoviesAfterYear,
  findMovieById,
  saveMovie,
  validateUser,
  findMoviesByOwner
};
