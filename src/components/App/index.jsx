import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import {Home} from '../Home';
import {MovieDetails} from '../MovieDetails';

import {fetchMovies} from '../../apis';
import {getQueryParams} from '../../utils/url';

const ITEMS_PER_PAGE = 3;

// Returns an array of movies divided by pages
// TODO: fix a bug with the last empty page!
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
        currentPagePosition + ITEMS_PER_PAGE,
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

const setFilter = (items, filterParam = 'None') => {
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

const setSearch = (items, searchParam) => {
  return items.filter(
    item => item.title.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0,
  );
};

const prepareData = items => {
  const {filterParam, searchParam} = getQueryParams();
  const paginatedMovies = preparePagination(
    setSearch(setFilter(items, filterParam), searchParam),
  );
  return {
    paginatedMovies,
    filterParam,
  };
};

// TODO: this seems like a bad decision. I should move some pagination logic into Pagination component
/*
const paginatedMoviesToArray = movies => {
  const res = movies.reduce(
    (moviesArr, paginatedData) => moviesArr.concat(paginatedData.moviesData),
    [],
  );
  return res;
};
 */

export const App = () => {
  const [sourceMovies, setSourceMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  // TODO: do I really need to store filterParam with useState?
  // Get rid of this useState and use just const { filterParam } = getQueryParams
  // Even if filterParam from url string will be changed it's not that scary
  const [filterParamFromQuery, setFilterParam] = useState('None');
  useEffect(() => {
    fetchMovies().then(res => {
      setSourceMovies(res.movies);
      const {paginatedMovies, filterParam} = prepareData(res.movies);
      const genres = getGenres(res.movies);
      setMovies(paginatedMovies);
      setGenres(genres);
      setFilterParam(filterParam);
    });
  }, []);

  const onFilter = () => {
    // const { paginatedMovies } = prepareData(paginatedMoviesToArray(movies));
    const {paginatedMovies} = prepareData(sourceMovies);
    const {filterParam} = getQueryParams();
    setMovies(paginatedMovies);
    setFilterParam(filterParam);
  };

  const onSearch = () => {
    const {paginatedMovies} = prepareData(sourceMovies);
    setMovies(paginatedMovies);
    // setFilterParam(filterParam);
  };

  return (
    <div>
      <div className="header">
        <div className="header__upper-line"></div>
        <div className="header__logo">
          <div className="header__logo-content">Movies Catalogue App</div>
        </div>
      </div>

      <Router>
        <Route
          exact
          path={['/', '/page/:pageNum']}
          render={({history}) => (
            <>
              <Home
                genres={genres}
                filterParamFromQuery={filterParamFromQuery}
                movies={movies}
                onFilter={onFilter}
                onSearch={onSearch}
                history={history}
              />
              <Redirect to="/page/1" />
            </>
          )}
        />
        <Route path="/movie/:id" component={MovieDetails} />
      </Router>

      <div className="footer">
        <div>
          Icons made by{' '}
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons">
            Smashicons
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>

        <div>(c) 2019 by nopefish</div>
      </div>
    </div>
  );
};
