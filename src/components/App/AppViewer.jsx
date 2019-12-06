import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Home } from '../Home';
import { getQueryParams } from '../../utils/url';
import {ITEMS_PER_PAGE} from '../../utils/const';

// Returns an array of movies divided by pages
const preparePagination = items => {
    const pagesCount = Math.floor(items.length / ITEMS_PER_PAGE);
    let pagedMovies = [];
    let pageNumber = 0,
        currentPagePosition = 0;
    while (pageNumber <= pagesCount) {
        if (items.length - currentPagePosition > 0) {
            const moviesData = items.slice(
                currentPagePosition,
                currentPagePosition + ITEMS_PER_PAGE
            );
            pagedMovies.push({
                pageNumber,
                moviesData
            });
        }
        pageNumber++;
        currentPagePosition = ITEMS_PER_PAGE * pageNumber;
    }
    return pagedMovies;
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
    const result = items.filter(
        item => item.title.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0
    );
    return result;
};

const prepareData = (items, location) => {
    const { filterParam, searchParam } = getQueryParams(location);
    const paginatedMovies = preparePagination(
        applySearch(applyFilter(items, filterParam), searchParam)
    );
    return {
        paginatedMovies
    };
};

export const AppViewer = ({movies, genres, loading}) => {
    const [filterParamFromQuery, setFilterParam] = useState('None');
    const [searchParamFromQuery, setSearchParam] = useState('');
    const location = useLocation();
    const { paginatedMovies } = prepareData(movies, location);

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
            loading={loading}
        />
    );
};
