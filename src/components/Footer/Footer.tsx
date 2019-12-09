import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => (
    <footer className="footer">
        <div className="content has-text-centered">
            <div>(c) 2019 by Nopefish</div>
            <div>
                Icons made by{' '}
                <a
                    href="https://www.flaticon.com/authors/smashicons"
                    title="Smashicons"
                >
                    Smashicons
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </div>
        </div>
    </footer>
);

export { Footer };
