import { Movie, Genre } from "./movie"

export type ReduxState = {
    movies: Array<Movie>,
    genres: Array<Genre>,
    filterParam: string,
    searchParam: string,
    isLoading: boolean,
    error: string
}

export type ReduxAction = {
    type: ActionsList,
    payload?: any
}

export type ActionsList =
    'FETCH_MOVIES' |
    'FETCH_MOVIES_ERROR' |
    'IS_LOADING' |
    'SET_MOVIES' |
    'SET_GENRES' |
    'FILTER' |
    'SEARCH';

export type ReduxActions = { [k in ActionsList]: string };

export type MovieCatalogueReducerResult = { [k in ActionsList]: ReduxState };

// Redux middlewares

interface MovieAction {
    type: ActionsList
}

export interface ActionSetMovies extends MovieAction {
    payload: Array<Movie>
};

export interface ActionFilter extends MovieAction {
    payload: string
}