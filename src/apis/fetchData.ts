import { FAKE_FETCH_DELAY } from '../utils/const';
import { RawMoviesData, Movie } from '../types';

const timeoutPromise = (): Promise<void> => new Promise((resolve, reject) => {
  setTimeout(resolve, FAKE_FETCH_DELAY);
});

export const fetchMovies = async (): Promise<RawMoviesData> => {
  let res = null;
  try {
    await timeoutPromise();
    res = await fetch('/db.json');
    res = res.json();
  }
  catch (e) {
    console.log(e);
  }
  return res;
}

export const fetchMovie = async (id: string): Promise<Movie | undefined> => {
  let res: RawMoviesData | Response | Movie | null = null;
  let movie: Movie | undefined = undefined;
  try {
    res = await fetch('/db.json');
    res = await res.json() as RawMoviesData;
    if (res.movies) {
      movie = res.movies.find((movie: Movie) => movie.id === +id) as Movie;
    }
  }
  catch (e) {
    console.log(e);
  }
  return movie;
}