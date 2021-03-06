import React, { ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQueryParams, getQueryParamsString } from '../../utils/url';
import { Genre } from '../../types';

interface Props {
    genres: Array<Genre>;
    onFilter(filterParam: string): void;
}

const Filter: React.FunctionComponent<Props> = ({
    genres = ['None'],
    onFilter,
}) => {
    let history = useHistory();
    const location = useLocation();
    const { filterParam = 'None' } = getQueryParams(location);

    const onOptionClick = (e: ChangeEvent<HTMLSelectElement>) => {
        const filterValue = e.target.value;
        history.push(
            `${getQueryParamsString(
                { newFilter: filterValue, newPage: 1 },
                location
            )}`
        );
        onFilter(filterValue);
    };

    const selectOptions = [
        <option key={'None'} value="">
            None
        </option>,
        ...genres.map((genre: string, genreIndex: number) => {
            return (
                <option key={`${genre}${genreIndex}`} value={genre}>
                    {genre}
                </option>
            );
        }),
    ];

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
                                    value={filterParam}
                                    onChange={onOptionClick}
                                >
                                    {selectOptions}
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
