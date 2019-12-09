import * as H from 'history';

import { getQueryParamsReturnType, getQueryParamsStringParams } from '../types';

export const getQueryParams = (
    location: H.Location
): getQueryParamsReturnType => {
    const { search } = location;
    const params = new URLSearchParams(search);
    const filterParam = params.get('filter');
    const searchParam = params.get('search');
    const pageParam = params.get('page');
    return {
        filterParam: filterParam || 'None',
        searchParam: searchParam || '',
        pageParam: pageParam || '',
    };
};

export const getQueryParamsString = (
    { newPage, newFilter, newSearch }: getQueryParamsStringParams,
    location: H.Location
): string => {
    const { filterParam, searchParam, pageParam } = getQueryParams(location);
    return `?page=${newPage === undefined ? pageParam : newPage}&filter=${
        newFilter === undefined ? filterParam : newFilter
    }&search=${newSearch === undefined ? searchParam : newSearch}`;
};
