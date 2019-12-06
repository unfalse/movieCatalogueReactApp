import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ReactComponent as CrossIcon } from '../../assets/delete.svg'; 
import { getQueryParamsString, getQueryParams } from '../../utils/url';

import './styles.css';

const Search = ({ onSearch }) => {
    const history = useHistory();
    const location = useLocation();
    const { searchParam } = getQueryParams(location);
    
    const onInputChange = e => {
        const searchValue = e.target.value;
        history.push(
            `${getQueryParamsString(
                { newSearch: searchValue, newPage: 1 },
                location
            )}`
        );
        onSearch();
    };

    const onInputClear = e => {
        history.push(
            `${getQueryParamsString(
                { newSearch: '', newPage: 1 },
                location
            )}`
        );
        onSearch();
    }

    return (
        <div className="columns">
            <div className="column is-narrow">
                <div className="field is-horizontal box" style={{ width: 90 }}>
                    <div className="field-label is-normal">
                        <label className="label">Search by Title</label>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="field-body">
                    <div className="field">
                        <div className="control has-icons-right">
                            <input
                                className="input"
                                type="text"
                                onChange={onInputChange}
                                value={searchParam}
                            />
                            <span
                                class={`icon is-right search-cross-icon${
                                    searchParam ? '' : '-disabled'
                                }`}
                                onClick={onInputClear}
                            >
                                <CrossIcon />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Search };
