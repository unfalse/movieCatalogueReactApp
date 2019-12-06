import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
    <ContentLoader
        height={70}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="4" y="9" rx="0" ry="0" width="60" height="51" />
        <rect x="70" y="14" rx="4" ry="4" width="209" height="8" />
        <rect x="70" y="28" rx="3" ry="3" width="225" height="9" />
        <rect x="70" y="42" rx="3" ry="3" width="225" height="9" />
    </ContentLoader>
);

export {MyLoader};