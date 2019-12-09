import React, { FunctionComponent, ComponentType } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQueryParamsString, getQueryParams } from '../../utils/url';
import { PaginatedMovies, Movie } from '../../types';

import './styles.css';

interface WrappedComponentProps {
    movies: Array<Movie>;
    loading: boolean;
}

interface Props {
    movies: PaginatedMovies;
    WrappedComponent: ComponentType<WrappedComponentProps>;
    loading: boolean;
}

export const Pagination: FunctionComponent<Props> = ({
    movies = [],
    WrappedComponent,
    loading,
}) => {
    let history = useHistory();
    const location = useLocation();
    const pageNum = Number(getQueryParams(location).pageParam) || 1;
    const pagesCount = movies.length;

    const gotoPage = (pageNumber: number): void => {
        const newParams = `${getQueryParamsString(
            { newPage: pageNumber },
            location
        )}`;
        history.push(newParams);
    };
    const goForward = () => void gotoPage(pageNum + 1);
    const goBackwards = () => void gotoPage(pageNum - 1);
    const goToFirst = () => void gotoPage(1);
    const goToLast = () => void gotoPage(pagesCount);

    const PaginationControls = () => {
        const backCondition = pageNum - 1 <= 0;
        const fwdCondition = pageNum >= pagesCount;
        return (
            <nav
                className="pagination"
                role="navigation"
                aria-label="pagination"
            >
                <button
                    className="pagination-previous has-background-white"
                    disabled={backCondition}
                    onClick={goBackwards}
                >
                    Previous
                </button>
                <button
                    className="pagination-next has-background-white"
                    disabled={fwdCondition}
                    onClick={goForward}
                >
                    Next page
                </button>
                <ul className="pagination-list">
                    <li>
                        <button
                            className="pagination-link has-background-white"
                            aria-label="Goto page 1"
                            disabled={backCondition}
                            onClick={goToFirst}
                        >
                            {backCondition ? '' : 1}
                        </button>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <button
                            className="pagination-link has-background-white"
                            aria-label={`Goto page ${pageNum - 1}`}
                            disabled={backCondition}
                            onClick={goBackwards}
                        >
                            {pageNum - 1}
                        </button>
                    </li>
                    <li>
                        <button
                            className="pagination-link is-current"
                            aria-label={`Page ${pageNum}`}
                            aria-current="page"
                        >
                            {pagesCount < 0 ? 'Loading...' : pageNum}
                        </button>
                    </li>
                    <li>
                        <button
                            className="pagination-link has-background-white"
                            aria-label={`Goto page ${pageNum + 1}`}
                            disabled={fwdCondition}
                            onClick={goForward}
                        >
                            {pageNum + 1}
                        </button>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <button
                            className="pagination-link has-background-white"
                            aria-label={`Goto page ${pagesCount}`}
                            disabled={fwdCondition}
                            onClick={goToLast}
                        >
                            {fwdCondition ? '' : pagesCount}
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    const moviesData: Array<Movie> =
        movies.length > 0 && pageNum - 1 >= 0 && movies[0].moviesData.length > 0
            ? movies[pageNum - 1].moviesData
            : [];

    return (
        <div className="pagination-container">
            <PaginationControls />
            <WrappedComponent movies={moviesData} loading={loading} />
            <PaginationControls />
        </div>
    );
};
