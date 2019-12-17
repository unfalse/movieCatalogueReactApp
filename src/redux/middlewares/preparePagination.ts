import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { ReduxAction, ReduxState, ReduxActionsList, ReduxActionSetMovies } from "../../types/redux";
import { ACTIONS } from "../reducers/movieCatalogueActions";
import { Movie, PaginatedMovies } from "../../types";
import { ITEMS_PER_PAGE } from "../../utils/const";

//@ts-ignore
const preparePagination: Middleware = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: ReduxAction) => {
    console.log('preparePagination');
    if (action.type === ACTIONS.SET_MOVIES) {
        (action as ReduxActionSetMovies).payload = putMoviesInPages(action.payload);
    }
    next(action);
}

const putMoviesInPages = (items: Array<Movie> = []): PaginatedMovies => {
    const pagesCount = Math.floor(items.length / ITEMS_PER_PAGE);
    let pagedMovies: PaginatedMovies = [];
    let pageNumber = 0,
        currentPagePosition = 0;
    while (pageNumber <= pagesCount) {
        if (items.length - currentPagePosition > 0) {
            const moviesData: Array<Movie> = items.slice(
                currentPagePosition,
                currentPagePosition + ITEMS_PER_PAGE
            );
            pagedMovies.push({
                pageNumber,
                moviesData,
            });
        }
        pageNumber++;
        currentPagePosition = ITEMS_PER_PAGE * pageNumber;
    }
    return pagedMovies;
};

export { preparePagination };