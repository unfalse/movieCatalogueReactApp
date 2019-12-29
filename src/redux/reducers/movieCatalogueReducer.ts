import { ACTIONS } from "./movieCatalogueActions"
import { ReduxState, ReduxAction, MovieCatalogueReducerResult } from "../../types/redux";

const defaultState: ReduxState = {
    movies: [],
    genres: [],
    filterParam: '',
    searchParam: '',
    isLoading: false,
    error: ''
};

const movieCatalogueReducer = (state: ReduxState = defaultState, { type, payload }: ReduxAction): ReduxState | undefined => {
    const actionMap: Partial<MovieCatalogueReducerResult> = {
        FETCH_MOVIES_ERROR: {
            ...state,
            error: payload
        },
        FILTER: {
            ...state,
            filterParam: payload
        },
        SEARCH: {
            ...state,
            searchParam: payload
        },
        IS_LOADING: {
            ...state,
            isLoading: payload
        },
        SET_MOVIES: {
            ...state,
            movies: payload,
        },
        SET_GENRES: {
            ...state,
            genres: payload
        },
    };
    if (ACTIONS.hasOwnProperty(type)) {
        return actionMap[type];
    }
    return state;
};

export { movieCatalogueReducer };