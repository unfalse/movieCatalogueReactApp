import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQueryParams, getQueryParamsString } from '../../utils/url';

const Filter = ({ genres, onFilter }) => {
    let history = useHistory();
    const location = useLocation();
    const { filterParam } = getQueryParams(location);

    const onOptionClick = e => {
        const filterValue = e.target.value;
        history.push(`${getQueryParamsString({ newFilter: filterValue, newPage: 1 }, location)}`);
        onFilter();
    };

    return (
        <div>
            Filter by
            <span>
                <select>
                    <option value="genre">genre</option>
                </select>
                <select onChange={onOptionClick} defaultValue={filterParam}>
                    {genres.map((genre, genreIndex) => (
                        <option key={genreIndex} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </span>
        </div>
    );
};

export { Filter };
