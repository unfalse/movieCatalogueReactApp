export const fetchMovies = () =>
  fetch('/db.json')
    .then(res => {
      return res.json();
    })
    .catch(e => void console.log(e));

export const fetchMovie = id =>
  fetch('/db.json')
    .then(res => res.json())
    .then(moviesData => {
      if (moviesData.movies) {
        return moviesData.movies.find(movie => movie.id === +id);
      }
    })
    .catch(e => void console.log(e));
