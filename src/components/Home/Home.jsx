import React from 'react';

import MovieList from '../MovieList';
import { Pagination } from '../Pagination';
import { Filter } from '../Filter';
import { Search } from '../Search';

export const Home = ({ genres, movies, onFilter, onSearch }) => {
    return (
        <div>
            <div>
                <Filter genres={genres} onFilter={onFilter} />
                <Search onSearch={onSearch} />
            </div>
            <div>
                <Pagination WrappedComponent={MovieList} movies={movies} />
            </div>
        </div>
    );
};
