import { Action } from 'redux';
import { Movie, Genre, PaginatedMovies } from "./movie"

export type ReduxState = {
    movies: Array<Movie> | PaginatedMovies,
    genres: Array<Genre>,
    filterParam: string,
    searchParam: string,
    isLoading: boolean,
    error: string
}

export type ReduxAction = {
    type: ReduxActionsList,
    payload?: any
}

export type ReduxActionsList =
    'FETCH_MOVIES' |
    'FETCH_MOVIES_ERROR' |
    'IS_LOADING' |
    'SET_MOVIES' |
    'SET_GENRES' |
    'FILTER' |
    'SEARCH';

export type ReduxActions = { [k in ReduxActionsList]: string };

export type MovieCatalogueReducerResult = { [k in ReduxActionsList]: ReduxState };

// Redux middlewares

export type ReduxActionSetMoviesPayload = Array<Movie> | PaginatedMovies;

export interface ReduxActionSetMovies extends Action {
    type: ReduxActionsList,
    payload: ReduxActionSetMoviesPayload
};