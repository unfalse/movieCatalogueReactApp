export interface RawMoviesData {
    genres: Array<Genre>;
    movies: Array<Movie>;
    error?: string;
}

export interface Movie {
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: Array<string>;
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
}

export type Genre = string;

export interface MoviePage {
    pageNumber: number;
    moviesData: Array<Movie>;
}

export type PaginatedMovies = Array<MoviePage>;