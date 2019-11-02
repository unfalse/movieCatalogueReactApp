import React from 'react';

import { ReactComponent as PlayButton } from '../../assets/playButton.svg';
import { ReactComponent as PlayNextButton } from '../../assets/playNextButton.svg';

import './styles.css';

export const Pagination = ({
    movies = [],
    WrappedComponent,
    history,
    pageNum = 1,
}) => {
    const pagesCount = movies.length;

    const gotoPage = pageNumber => void history.push(`/page/${pageNumber}`);

    const goForward = () => void gotoPage(pageNum + 1);
    const goBackwards = () => void gotoPage(pageNum - 1);
    const goToFirst = () => void gotoPage(1);
    const goToLast = () => void gotoPage(pagesCount);
    const backCondition = pageNum - 1 <= 0;
    const fwdCondition = pageNum >= pagesCount;

    const PageControls = () => {
        return (
            <div className="pagination-controls">
                <PlayNextButton
                    className={
                        backCondition
                            ? 'button play-next-button-reverse__inactive'
                            : 'button play-next-button-reverse__active'
                    }
                    disabled={backCondition}
                    onClick={goToFirst}
                />
                <PlayButton
                    className={
                        backCondition
                            ? 'button play-button-reverse__inactive'
                            : 'button play-button-reverse__active'
                    }
                    disabled={backCondition}
                    onClick={goBackwards}
                />
                <span>
                    {pagesCount < 0
                        ? 'Loading...'
                        : `${pageNum} of ${pagesCount}`}
                </span>
                <PlayButton
                    className={
                        fwdCondition
                            ? 'button play-button__inactive'
                            : 'button play-button__active'
                    }
                    disabled={fwdCondition}
                    onClick={goForward}
                />
                <PlayNextButton
                    className={
                        fwdCondition
                            ? 'button play-next-button__inactive'
                            : 'button play-next-button__active'
                    }
                    disabled={fwdCondition}
                    onClick={goToLast}
                />
            </div>
        );
    };

    const moviesData =
        movies.length > 0 && pageNum - 1 >= 0
            ? movies[pageNum - 1].moviesData
            : [];

    return (
        <div>
            <PageControls />
            <WrappedComponent movies={moviesData} />
            <PageControls />
        </div>
    );
};
