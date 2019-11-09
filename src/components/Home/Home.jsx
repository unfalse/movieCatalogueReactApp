import React from 'react';

import MovieList from '../MovieList';
import { Pagination } from '../Pagination';
import { Filter } from '../Filter';
import { Search } from '../Search';

import './Home.css';

export const Home = props => {
    const { genres, movies, onFilter, onSearch } = props;

    return (
        <div>
            <div className="filters-block">
                <Filter genres={genres} onFilter={onFilter} />
                <Search onSearch={onSearch} />
            </div>

            <div className="container">
                <Pagination WrappedComponent={MovieList} movies={movies} />
            </div>
        </div>
    );
};
