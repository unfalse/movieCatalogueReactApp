import React from 'react';

import './styles.css';

interface Props {
    onClick(): void;
}

const Header: React.FunctionComponent<Props> = ({ onClick }) => (
    <section className="hero">
        <div className="hero-body">
            <div className="container center pointer" onClick={onClick}>
                <div>
                    <h1 className="title is-1">Movies</h1>
                </div>
                <div>
                    <h1 className="subtitle is-3">Catalogue</h1>
                </div>
            </div>
        </div>
    </section>
);

export { Header };
