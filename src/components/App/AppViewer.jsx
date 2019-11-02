import React, { useState } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { Home } from '../Home';
import { MovieDetails } from '../MovieDetails';
import { getQueryParams } from '../../utils/url';

import './styles.css';

const ITEMS_PER_PAGE = 3;

const history = createBrowserHistory();

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

const prepareData = items => {
    const { filterParam, searchParam } = getQueryParams();
    const paginatedMovies = preparePagination(
        applySearch(applyFilter(items, filterParam), searchParam)
    );
    const genres = getGenres(items);
    return {
        paginatedMovies,
        genres,
    };
};

export const AppViewer = movies => {
    const [filterParamFromQuery, setFilterParam] = useState('None');
    const [searchParamFromQuery, setSearchParam] = useState('');

    const onFilter = () => {
        const { filterParam } = getQueryParams();
        setFilterParam(filterParam);
    };

    const onSearch = () => {
        const { searchParam } = getQueryParams();
        setSearchParam(searchParam);
    };

    const { paginatedMovies, genres } = prepareData(movies);
console.log('AppViewer func body');
    return (
        <div>
            <div className="header">
                <div className="header__upper-line"></div>
                <div className="header__logo">
                    <div className="header__logo-content">
                        Movies Catalogue App
                    </div>
                </div>
            </div>

            <Router history={history}>
                <Route
                    exact
                    path={['/', '/page/:pageNum']}
                    render={({ history, location }) => {
                        console.log(location);
                        return (
                            <>
                                <Home
                                    genres={genres}
                                    filterParamFromQuery={filterParamFromQuery}
                                    searchParamFromQuery={searchParamFromQuery}
                                    movies={paginatedMovies}
                                    onFilter={onFilter}
                                    onSearch={onSearch}
                                    history={history}
                                />
                                <Redirect to="/page/1" />
                            </>
                        )}
                    }
                />
                <Route path="/movie/:id" component={MovieDetails} />
            </Router>

            <div className="footer">
                <div className="footer__content">
                    <div className="footer__icons-notice">
                        Icons made by{' '}
                        <a
                            href="https://www.flaticon.com/authors/smashicons"
                            title="Smashicons"
                        >
                            Smashicons
                        </a>{' '}
                        from{' '}
                        <a href="https://www.flaticon.com/" title="Flaticon">
                            www.flaticon.com
                        </a>
                    </div>
                    <div className="footer__copyright-label">
                        (c) 2019 by nopefish
                    </div>
                </div>
            </div>
        </div>
    );
};
