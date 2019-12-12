import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import * as H from 'history';

import { Home } from '../Home';
import { getQueryParams } from '../../utils/url';
import { ITEMS_PER_PAGE } from '../../utils/const';
import { Movie, PaginatedMovies, Genre } from '../../types';

// Returns an array of movies divided by pages
const preparePagination = (items: Array<Movie>): PaginatedMovies => {
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

const prepareData = (items: Array<Movie>, location: H.Location): PaginatedMovies => {
    const { filterParam, searchParam } = getQueryParams(location);
    const paginatedMovies = preparePagination(
        applySearch(applyFilter(items, filterParam), searchParam)
    );
    return paginatedMovies;
};

interface Props {
    movies: Array<Movie>;
    genres: Array<Genre>;
    loading: boolean;
    error?: string;
}

export const AppViewer: React.FunctionComponent<Props> = ({ movies, genres, loading, error }: Props) => {
    const [filterParamFromQuery, setFilterParam] = useState<string>('None');
    const [searchParamFromQuery, setSearchParam] = useState<string>('');
    const location = useLocation();
    const paginatedMovies = prepareData(movies, location);

    const onFilter = () => {
        const { filterParam } = getQueryParams(location);
        setFilterParam(filterParam);
    };

    const onSearch = () => {
        const { searchParam } = getQueryParams(location);
        setSearchParam(searchParam);
    };

    return (
        <div>
            {error && (
                <div className="is-italic subtitle has-text-centered">
                    {error}
                </div>
            )}
            {!error && (
                <Home
                    genres={genres}
                    movies={paginatedMovies}
                    onFilter={onFilter}
                    onSearch={onSearch}
                    loading={loading}
                />
            )}
        </div>
    );
};
