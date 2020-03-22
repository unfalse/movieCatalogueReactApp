import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { Routes } from './components/Router';

import './styles/bulma-styles.scss';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
);
