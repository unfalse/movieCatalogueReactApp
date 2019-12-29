import React, { FunctionComponent } from 'react';

import MovieList from '../MovieList';
import { Pagination } from '../Pagination';
import { Filter } from '../Filter';
import { Search } from '../Search';
import { Genre, Movie } from '../../types';

interface Props {
    genres: Array<Genre>;
    movies: Array<Movie>;
    onFilter(): void;
    onSearch(): void;
    loading: boolean;
}

export const Home: FunctionComponent<Props> = ({
    genres,
    movies,
    onFilter,
    onSearch,
    loading,
}) => {
    return (
        <div>
            <div>
                <Filter genres={genres} onFilter={onFilter} />
                <Search onSearch={onSearch} />
            </div>
            <div>
                <Pagination
                    WrappedComponent={MovieList}
                    movies={movies}
                    loading={loading}
                />
            </div>
        </div>
    );
};
