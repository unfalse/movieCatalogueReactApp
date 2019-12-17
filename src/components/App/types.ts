import { PaginatedMovies, Genre } from "../../types";

export interface StateProps {
    paginatedMovies: PaginatedMovies;
    genres: Array<Genre>;
    isLoading: boolean;
}

export interface DispatchProps {
    fetchMovies(): void;
    onFilter(): void;
    onSearch(): void;
}

export interface Props extends StateProps, DispatchProps {};