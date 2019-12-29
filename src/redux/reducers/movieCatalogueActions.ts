import { Dispatch } from 'redux';

import { fetchMovies } from '../../apis/fetchData';
import { RawMoviesData, Movie, Genre } from '../../types/movie';
import { ReduxActions } from '../../types/redux';

const ACTIONS: ReduxActions = {
    FETCH_MOVIES: 'FETCH_MOVIES',
    FETCH_MOVIES_ERROR: 'FETCH_MOVIES_ERROR',
    IS_LOADING: 'IS_LOADING',
    SET_MOVIES: 'SET_MOVIES',
    SET_GENRES: 'SET_GENRES',
    FILTER: 'FILTER',
    SEARCH: 'SEARCH'
};

const _createAction = <T>(type: string, payload?: T) => ({
    type, payload
})

// TODO: https://stackoverflow.com/questions/54844839/typescript-how-to-type-the-dispatch-in-redux
const fetchMoviesAction = (filterParam: string, searchParam: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setIsLoadingAction(true));
    const res: RawMoviesData = await fetchMovies();
    dispatch(setMoviesAction(res.movies));
    dispatch(setGenresAction(res.genres));
    dispatch(setIsLoadingAction(false));
    // to handle url params
    dispatch(filterAction(filterParam));
    dispatch(searchAction(searchParam));
}

const setMoviesAction = (movies: Array<Movie>) =>
    _createAction(ACTIONS.SET_MOVIES, movies);

const setGenresAction = (genres: Array<Genre>) =>
    _createAction(ACTIONS.SET_GENRES, genres);

const setIsLoadingAction = (loadingState: boolean) =>
    _createAction(ACTIONS.IS_LOADING, loadingState);

const filterAction = (filterParam: string) =>
    _createAction(ACTIONS.FILTER, filterParam)

const searchAction = (searchParam: string) =>
    _createAction(ACTIONS.SEARCH, searchParam);

export { ACTIONS, fetchMoviesAction, setMoviesAction, setGenresAction, setIsLoadingAction, filterAction, searchAction };