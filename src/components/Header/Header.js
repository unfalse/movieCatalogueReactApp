import React from 'react';

// TODO: make the contents of a component to be at the horizontal center
const Header = ({ onClick }) => (
    <div onClick={onClick}>
        <h1 className="title is-1">Movies</h1>
        <h1 className="subtitle is-3">Catalogue</h1>
    </div>
);

export { Header };