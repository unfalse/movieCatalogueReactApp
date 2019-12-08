import { FAKE_FETCH_DELAY } from '../utils/const';

const timeoutPromise = (): Promise<void> => new Promise((resolve, reject) => {
  setTimeout(resolve, FAKE_FETCH_DELAY);
});

export const fetchMovies = (): Promise<RawMoviesData> =>
  timeoutPromise().then(() =>
    fetch('/db.json')
      .then(res => {
        return res.json();
      })
      .catch(e => void console.log(e))
  );

export const fetchMovie = (id: string): Promise<Movie> =>
    fetch('/db.json')
      .then(res => res.json())
    .then((moviesData: RawMoviesData) => {
        if (moviesData.movies) {
          return moviesData.movies.find((movie: Movie) => movie.id === +id);
        }
      })
      .catch(e => void console.log(e));