import React from 'react';

import {getQueryParams} from '../../utils/url';

const Search = ({onSearch}) => {
  const onInputChange = e => {
    const {filterParam} = getQueryParams();
    const searchParam = e.target.value;
    window.history.pushState(
      {},
      '',
      `${window.origin}/?filter=${filterParam}&search=${searchParam}`,
    );
    onSearch();
  };

  return (
    <div>
      Search by Title
      <input type="text" onChange={onInputChange} />
    </div>
  );
};

export {Search};
