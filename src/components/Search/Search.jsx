import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQueryParamsString, getQueryParams } from '../../utils/url';

const Search = ({ onSearch }) => {
    let history = useHistory();
    const location = useLocation();
    const { searchParam } = getQueryParams(location);
    const onInputChange = e => {
        const searchValue = e.target.value;
        history.push(`${getQueryParamsString({ newSearch: searchValue, newPage: 1 }, location)}`);
        onSearch();
    };
    return (
        <div>
            Search by Title
            <input type="text" onChange={onInputChange} value={searchParam} />
        </div>
    );
};

export { Search };
