import { Dispatch, MiddlewareAPI, Action } from "redux";

import { ReduxActionSetMovies, ReduxState } from "../../types/redux";
import { ACTIONS } from "../reducers/movieCatalogueActions";
import { Movie, PaginatedMovies } from "../../types";
import { ITEMS_PER_PAGE } from "../../utils/const";

const preparePagination = ({ getState }: MiddlewareAPI<ReduxState>) =>
    (next: Dispatch<ReduxState>) =>
        (action: ReduxActionSetMovies): ReduxActionSetMovies => {
            const { filterParam, searchParam } = getState();
            console.log('preparePagination');
            if (action.type === ACTIONS.SET_MOVIES) {
                // action.payload = putMoviesInPages(action.payload as Array<Movie>);
                action.payload = prepareData(action.payload as Array<Movie>, filterParam, searchParam);
            }
            // if (action.type === ACTIONS.FILTER) {
            //     action.payload = 
            // }
            return next(action);
}

const prepareData = (movies: Array<Movie>, filterParam: string, searchParam: string): PaginatedMovies => {
    return putMoviesInPages(movies);
        //applySearch(applyFilter(movies, filterParam), searchParam)
    //);
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

const applyFilter = (
    items: Array<Movie>,
    filterParam = 'None'
): Array<Movie> => {
    let filteredItems: Array<Movie> = [];
    if (filterParam === 'None') return items;
    items.forEach((item: Movie) => {
        if (!item.genres) console.log(item);
        if (item.genres.indexOf(filterParam) >= 0) {
            filteredItems.push(item);
        }
    });
    return filteredItems;
};

const applySearch = (
    items: Array<Movie>,
    searchParam: string
): Array<Movie> => {
    const result = items.filter(
        item => item.title.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0
    );
    return result;
};

export { preparePagination };