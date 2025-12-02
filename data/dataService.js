const path = require("path");
const fs = require("fs");
const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies.json"), "utf8")
);
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users.json"), "utf8")
);

//Guarda el array de películas en el JSON
function saveMovies() {
  fs.writeFileSync(
    path.join(__dirname, "movies.json"),
    JSON.stringify(movies, null, 2),
    "utf8"
  );
}
//********************** Funciones de películas *******************************/
function findAllMovies() {
  return movies;
}
// Por si quieres filtrar “recientes”
function findMoviesAfterYear(year) {
  return movies.filter((m) => m.year >= year);
}
function findMovieById(id) {
  return movies.filter((m) => m.id == id)[0];
}
function saveMovie(movie) {
  movies.push(movie);
  saveMovies();
}
//*************************** Función de login **************************/
function validateUser(email, password) {
  let query = users.filter(u => u.username == email);

  if (query.length > 0) {
    if (query[0].password == password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


module.exports = {
  findAllMovies,
  findMoviesAfterYear,
  findMovieById,
  saveMovie,
  validateUser,
};
