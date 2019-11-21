import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ReactComponent as PlayButton } from '../../assets/playButton.svg';
import { ReactComponent as PlayNextButton } from '../../assets/playNextButton.svg';
import { getQueryParamsString, getQueryParams } from '../../utils/url';

import './styles.css';

export const Pagination = ({ movies = [], WrappedComponent }) => {
    let history = useHistory();
    const location = useLocation();
    const pageNum = Number(getQueryParams(location).pageParam) || 1;
    const pagesCount = movies.length;

    const gotoPage = pageNumber => {
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
                <a
                    className="pagination-previous"
                    disabled={backCondition}
                    onClick={goBackwards}
                >
                    Previous
                </a>
                <a
                    className="pagination-next"
                    disabled={fwdCondition}
                    onClick={goForward}
                >
                    Next page
                </a>
                <ul className="pagination-list">
                    <li>
                        <a
                            className="pagination-link"
                            aria-label="Goto page 1"
                            disabled={backCondition}
                            onClick={goToFirst}
                        >
                            {backCondition ? '' :1}
                        </a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label={`Goto page ${pageNum - 1}`}
                            disabled={backCondition}
                            onClick={goBackwards}
                        >
                            {pageNum - 1}
                        </a>
                    </li>
                    <li>
                        <a
                            className="pagination-link is-current"
                            aria-label={`Page ${pageNum}`}
                            aria-current="page"
                        >
                            {pagesCount < 0 ? 'Loading...' : pageNum}
                        </a>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label={`Goto page ${pageNum + 1}`}
                            disabled={fwdCondition}
                            onClick={goForward}
                        >
                            {pageNum + 1}
                        </a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a
                            className="pagination-link"
                            aria-label={`Goto page ${pagesCount}`}
                            disabled={fwdCondition}
                            onClick={goToLast}
                        >
                            {fwdCondition ? '' : pagesCount}
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };

    const moviesData =
        movies.length > 0 &&
        (pageNum - 1 >= 0 && movies[0].moviesData.length > 0)
            ? movies[pageNum - 1].moviesData
            : [];

    return (
        <div className="pagination-container">
            <PaginationControls />
            <WrappedComponent movies={moviesData} />
            <PaginationControls />
        </div>
    );
};
