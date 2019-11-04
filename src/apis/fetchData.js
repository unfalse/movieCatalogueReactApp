const timeoutPromise = () => new Promise((resolve, reject) => {
  setTimeout(resolve, 2000);
});

export const fetchMovies = () =>
  timeoutPromise().then(() =>
    fetch('/db.json')
      .then(res => {
        return res.json();
      })
      .catch(e => void console.log(e))
  );

export const fetchMovie = id =>
  timeoutPromise().then(() =>
    fetch('/db.json')
      .then(res => res.json())
      .then(moviesData => {
        if (moviesData.movies) {
          return moviesData.movies.find(movie => movie.id === +id);
        }
      })
      .catch(e => void console.log(e))
  );
