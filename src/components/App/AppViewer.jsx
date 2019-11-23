import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Home } from '../Home';
import { getQueryParams } from '../../utils/url';

const ITEMS_PER_PAGE = 3;

// Returns an array of movies divided by pages
const preparePagination = items => {
    const pagesCount = Math.floor(items.length / ITEMS_PER_PAGE);
    let pagedMovies = [];
    let pageNumber = 0,
        currentPagePosition = 0;
    while (pageNumber <= pagesCount) {
        pagedMovies.push({
            pageNumber,
            moviesData: items.slice(
                currentPagePosition,
                currentPagePosition + ITEMS_PER_PAGE
            ),
        });
        pageNumber++;
        currentPagePosition = ITEMS_PER_PAGE * pageNumber;
    }
    return pagedMovies;
};

const getGenres = items => {
    let genres = [];
    items.forEach(item => {
        item.genres.forEach(genre => {
            if (genres.indexOf(genre) < 0) {
                genres.push(genre);
            }
        });
    });
    return [].concat(['None'], genres);
};

const applyFilter = (items, filterParam = 'None') => {
    let filteredItems = [];
    if (filterParam === 'None') return items;
    items.forEach(item => {
        if (!item.genres) console.log(item);
        if (item.genres.indexOf(filterParam) >= 0) {
            filteredItems.push(item);
        }
    });
    return filteredItems;
};

const applySearch = (items, searchParam) => {
    return items.filter(
        item => item.title.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0
    );
};

const prepareData = (items, location) => {
    const { filterParam, searchParam } = getQueryParams(location);
    const paginatedMovies = preparePagination(
        applySearch(applyFilter(items, filterParam), searchParam)
    );
    const genres = getGenres(items);
    return {
        paginatedMovies,
        genres,
    };
};

export const AppViewer = ({movies}) => {
    const [filterParamFromQuery, setFilterParam] = useState('None');
    const [searchParamFromQuery, setSearchParam] = useState('');
    const location = useLocation();
    const { paginatedMovies, genres } = prepareData(movies, location);

    const onFilter = () => {
        const { filterParam } = getQueryParams(location);
        setFilterParam(filterParam);
    };

    const onSearch = () => {
        const { searchParam } = getQueryParams(location);
        setSearchParam(searchParam);
    };

    return (
        <Home
            genres={genres}
            movies={paginatedMovies}
            onFilter={onFilter}
            onSearch={onSearch}
        />
    );
};
