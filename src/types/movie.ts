export interface RawMoviesData {
    genres: Array<Genre>;
    movies: Array<Movie>;
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