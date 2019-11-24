import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQueryParams, getQueryParamsString } from '../../utils/url';

const Filter = ({ genres, onFilter }) => {
    let history = useHistory();
    const location = useLocation();
    const { filterParam } = getQueryParams(location);

    const onOptionClick = e => {
        const filterValue = e.target.value;
        history.push(
            `${getQueryParamsString(
                { newFilter: filterValue, newPage: 1 },
                location
            )}`
        );
        onFilter();
    };

    return (
        <div className="columns">
            <div className="column is-narrow">
                <div className="field is-horizontal box" style={{ width: 90 }}>
                    <div className="field-label is-normal">
                        <label className="label">Filter by</label>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="genre">genre</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    onChange={onOptionClick}
                                >
                                    {
                                        genres.map((genre, genreIndex) => {
                                            const selectedProp = (filterParam === genre) ? { selected: true } : {};
                                            return(
                                                <option key={genreIndex} value={genre} {...selectedProp}>
                                                    {genre}
                                                </option>
                                            )
                                        })
                                }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Filter };
