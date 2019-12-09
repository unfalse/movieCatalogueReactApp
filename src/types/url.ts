export interface getQueryParamsReturnType {
    filterParam: string;
    searchParam: string;
    pageParam: string;
}

export interface getQueryParamsStringParams {
    newPage: number;
    newFilter?: string;
    newSearch?: string;
}