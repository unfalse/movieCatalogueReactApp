import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import './styles/bulma-styles.scss';
import { Routes } from './components/Router';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    rootElement
);
