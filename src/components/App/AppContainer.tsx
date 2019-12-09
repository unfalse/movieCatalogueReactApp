import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppViewer } from './AppViewer';
import { fetchMovies } from '../../apis';
import { MovieDetails } from '../MovieDetails';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Genre, RawMoviesData, Movie } from '../../types/movie';

import './bulma-styles.scss';

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
        async function scopedFetchMovies() {
            const res: RawMoviesData = await fetchMovies();
            setMovies(res.movies);
            setGenres(['None', ...res.genres]);
            setLoading(false);
        }
        scopedFetchMovies();
    }, []);

    return (
        <div className="container">
            <Router>
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
