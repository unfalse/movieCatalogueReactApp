import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppViewer } from './AppViewer';
import { fetchMovies } from '../../apis';
import { MovieDetails } from '../MovieDetails';
import { Header } from '../Header';
import { Footer } from '../Footer';

import './bulma-styles.scss';

const history = createBrowserHistory();

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
                <Footer />
            </Router>
        </div>
    );
};
