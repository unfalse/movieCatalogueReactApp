import React from 'react';
import {useParams} from 'react-router-dom';

import MovieList from '../MovieList';
import {Pagination} from '../Pagination';
import {Filter} from '../Filter';
import {Search} from '../Search';

import './Home.css';

export const Home = props => {
  const {
    genres,
    filterParamFromQuery,
    movies,
    onFilter,
    onSearch,
    history,
  } = props;
  const {pageNum = 1} = useParams();
  return (
    <div>
      <div className="filters-block">
        <Filter
          genres={genres}
          onFilter={onFilter}
          filterParam={filterParamFromQuery}
        />
        <Search onSearch={onSearch} />
      </div>

      <div className="content">
        <Pagination
          WrappedComponent={MovieList}
          movies={movies}
          history={history}
          pageNum={+pageNum}
        />
      </div>
    </div>
  );
};
