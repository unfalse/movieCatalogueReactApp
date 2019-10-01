const getQueryParams = () => {
  const {search} = window.location;
  const params = new URLSearchParams(search);
  const filterParam = params.get('filter');
  const searchParam = params.get('search');
  return {
    filterParam: filterParam || 'None',
    searchParam: searchParam || '',
  };
};

export {getQueryParams};
