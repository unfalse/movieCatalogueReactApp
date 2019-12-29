import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";

import { movieCatalogueReducer } from './reducers/movieCatalogueReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: any = createStore(
    movieCatalogueReducer,
    composeEnhancers(
        applyMiddleware(thunk, logger)
    ));

export { store };