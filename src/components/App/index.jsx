import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Home} from '../Home';
import {MovieDetails} from '../MovieDetails';

export const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/movie/:id" component={MovieDetails} />
  </Router>
);
