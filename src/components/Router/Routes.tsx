import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { App } from '../App';
import { MovieDetails } from '../MovieDetails';
import { Header } from '../Header';
import { Footer } from '../Footer';

const history = createBrowserHistory();

const Routes: React.FunctionComponent = () => {
    const resetAndGoHome = (): void => {
        history.push('/');
        window.location.reload(true);
    };

    return (
        <div className="container">
            <Router>
                <Header onClick={resetAndGoHome} />
                <Route
                    exact
                    path={'/'}
                    component={App}
                />
                <Route path="/movie/:id" component={MovieDetails} />
                <Footer />
            </Router>
        </div>
    );
}

export { Routes };