import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppViewer } from './AppViewer';
import { fetchMovies } from '../../apis';
import { MovieDetails } from '../MovieDetails';

import './bulma-styles.scss';

const history = createBrowserHistory();

const Header = ({ onClick }) => (
    <div className="header" onClick={onClick}>
        <div className="header__upper-line"></div>
        <div className="header__logo">
            <div className="header__logo-content">Movies Catalogue App</div>
        </div>
    </div>
);

const Footer = () => (
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
            <div className="footer__copyright-label">(c) 2019 by nopefish</div>
        </div>
    </div>
);

export const AppContainer = () => {
    const [movies, setMovies] = useState([]);
    const goHome = () => {
        history.push('/');
    };
    useEffect(() => {
        fetchMovies().then(res => {
            setMovies(res.movies);
        });
    }, []);

    return (
        <div className="container">
            <Router history={history}>
                <Header onClick={goHome} />
                <Route
                    exact
                    path={'/'}
                    render={() => <AppViewer movies={movies} />}
                />
                <Route path="/movie/:id" component={MovieDetails} />
            </Router>
            <Footer />
        </div>
    );
};
