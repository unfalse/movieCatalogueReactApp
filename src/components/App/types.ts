import { Genre, Movie } from "../../types";

export interface StateProps {
    movies: Array<Movie>;
    genres: Array<Genre>;
    isLoading: boolean;
}

export interface DispatchProps {
    fetchMovies(filterParam: string, searchParam: string): void;
    onFilter(filterParam: string): void;
    onSearch(searchParam: string): void;
}

export interface Props extends StateProps, DispatchProps {};