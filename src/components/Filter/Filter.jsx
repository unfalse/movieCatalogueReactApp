import React from 'react';

import {getQueryParams} from '../../utils/url';

const Filter = ({genres, onFilter, filterParam}) => {
  const onOptionClick = e => {
    const filterValue = e.target.value;
    window.history.pushState({}, '', `${window.origin}/?filter=${filterValue}`);
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

export {Filter};
