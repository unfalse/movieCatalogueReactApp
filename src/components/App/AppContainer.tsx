import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppViewer } from './AppViewer';
import { fetchMovies } from '../../apis';
import { MovieDetails } from '../MovieDetails';
import { Header } from '../Header';
import { Footer } from '../Footer';

import './bulma-styles.scss';
import { Genre, RawMoviesData, Movie } from '../../types/movie';

const history = createBrowserHistory();

export const AppContainer: React.FunctionComponent = () => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [genres, setGenres] = useState<Array<Genre>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const resetAndGoHome = (): void => {
        history.push('/');
        window.location.reload(true);
    };
    useEffect(() => {
        fetchMovies().then((res: RawMoviesData) => {
            setMovies(res.movies);
            setGenres([].concat(['None'], res.genres));
            setLoading(false);
        });
    }, []);

    return (
        <div className="container">
            <Router history={history}>
                <Header onClick={resetAndGoHome} />
                <Route
                    exact
                    path={'/'}
                    render={() => (
                        <AppViewer
                            movies={movies}
                            genres={genres}
                            loading={loading}
                        />
                    )}
                />
                <Route path="/movie/:id" component={MovieDetails} />
                <Footer />
            </Router>
        </div>
    );
};
